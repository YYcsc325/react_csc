import { observable,action,toJS, runInAction } from 'mobx';
import { Modal, message } from 'antd';
import server from './index.service'

class Index {
   // 文件数据
   @observable fileList = [];
   // 上传标识
   @observable Uploading = false;
   
   // 重置file数据,查看的时候回显的数据 
   @action setFileList = ( data = [] ) => {
       let fileList = [];
       if(Array.isArray(data) && data.length > 0){
           fileList = data.map((file,index)=>{
               return {
                   id:file.id,
                   uid:index,
                   name:file.name,
                   status:'done',
                   downloadLink:file.downloadLink
               }
           })
       }
       this.fileList = fileList;
   }
   
   // 更改上传的进度
   @action setUploadFlag = bool => {
       this.Uploading = bool;
   }

   // 删除文件 
   @action removeFile = file => {
       const index = this.fileList.indexOf(file);
       Modal.confirm({
           title:'确认删除当前附件?',
           onOk: () => {
               this.fileList.splice(index,1);
           }
       })
   }

   // 上传拦截
   @action beforeUpload = file => {
       // 大于20M禁止上传
       if(file && file.size > 20971520){
           message.error('文件过大!');
           return false;
       }
       // 校验一些不能上传的文件
       const fileName = file.name;
       const fileNameSuffix = fileName.slice(fileName.lastIndexOf('.'));
       const fileNamePrefix = fileName.slice(fileName.lastIndexOf('.'));

       if(fileNamePrefix === '.exe' || fileNameSuffix === '.png'){
           message.error( `不能上传${fileNameSuffix}文件` );
           return false;
       }
       // 校验有无敏感的字符
       let regexp = /[``%&*#@()!~]/g;
       if(regexp.test(fileNamePrefix)){
           let msg = fileNamePrefix.match(regexp);
           message.error(msg);
           return false;
       }

       // 重新进行赋值
       this.fileList = [...this.fileList,file];
       this.setUploadFlag(false);
       return false;
   }
   
   // 上传单个文件,不需要加 @action 因为是用来后续循环从,作为一个函数调用
   upload = async(file) => {
        // 如果已上传且存在id不需要重复上传
        if(file.status === 'done' && file.id) return file;
        // 上传中
        file.status = 'uploading';

        // 整理需要上传的数据
        const formData = new FormData();
        formData.append('file',toJS(file));
        const result = server.upload(formData);

        // 借口请求成功，且返回当前文件信息
        if(result.data.ret === '0' && Array.isArray(result.data.data) && result.data.data.length > 0){
            // 上传成功时修改对应文件状态
            const resuleData = result.data.data[0];
                  // 修改状态改为已上传的状态 
                  file.status = 'done';
                  file.downloadLink = resuleData.downloadLink;
                  file.id = resuleData.attachmentKey;
                  file.attachmentKey = resuleData.attachmentKey;
                  file.name = resuleData.name;
        }else{
            file.status = 'error';
        }
        return file;
   }

   // 文件上传，最后处理多文件上传
   @action handleUpload = async() => {
       // 无文件可上传时，直接返回
       if( this.fileList.every(file => file.status === 'done') || this.fileList.length === '0'){
           message.error('暂无文件可上传,请选择文件!');
           return 
       }

       // 请求按钮点击loading动画
       this.Uploading = true;
       // 循环上传所有文件
       const newFileList = await Promise.all(this.fileList.map(this.upload));

       let isSuccess = true;

       // 判断是否存在上传错误文件
       newFileList.forEach(file => {
           if(file.status !== 'done'){
               isSuccess = false;
           }
       })


       if(!isSuccess){
           message.error('文件上传失败!')
       }else{
           message.success('文件上传成功!');
       }

       runInAction(()=>{
           this.fileList = newFileList;
       })
       this.Uploading = false;
   }
}
export default new Index();