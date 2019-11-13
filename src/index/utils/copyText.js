function copyRangeText(){
    try{
        const range = document.createRange();
        range.selectNode(document.getElementById('id1'));
        const selection = window.getSelection();
        debugger;
        if(selection.rangeCount > 0) selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand('copy');
        // alert('复制成功')
    }catch(e){
        alert('你复制个蛋');
    }
    
}
function copyInput(){    
    let obj = document.getElementById('input1');
    obj.select();
    try{   
        if(document.execCommand("Copy","false",null)){
        //如果复制成功
        alert("复制成功！");  
        }else{
        //如果复制失败
        alert("复制失败！");
        }
    }catch(e){    
      alert("您的浏览器不支持此复制功能，请选中相应内容并使用Ctrl+C进行复制!");    
    }    
 } 
 const CopyContent = props => {
    const createRef = React.createRef();
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span ref={createRef}>{props.content}</span>
        <a
          href="###"
          onClick={() => {
            const text = createRef.current.innerText;
            var oInput = document.createElement('input');
            oInput.value = text;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
            document.execCommand('Copy'); // 执行浏览器复制命令
            oInput.remove();
            message.info('复制成功');
          }}
        >
          复制
        </a>
      </div>
    );
  };