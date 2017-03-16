## Select

### 1. 取消严格等于
 
 getLabelBySingleValue
 
 getValuePropValue 比值 采用 ==

 ```js
       } else if (getValuePropValue(child) == value) {
          label = this.getLabelFromOption(child);		          label = this.getLabelFromOption(child);
        }		        
 }
 ```
 
 
### 2. 添加extra的支持

### 3. onchange 某些情况下返回的参数修正

[https://github.com/setState/select/commit/afcdb54d4a36d31cfe3c16a4be125dae9cf3da07#diff-42c78aeee9cd69869523e9f9538de29c](https://github.com/setState/select/commit/afcdb54d4a36d31cfe3c16a4be125dae9cf3da07#diff-42c78aeee9cd69869523e9f9538de29c)

### 4. getLabelByValue 

> 取消在label没数值的时候显示value的值

[https://github.com/setState/select/commit/7c09c5885d4c82075629e80baa467443d5ade6c2](https://github.com/setState/select/commit/7c09c5885d4c82075629e80baa467443d5ade6c2)

### 5. 添加setValue，getValue

### 6 addLabelToValue
兼容以下情况

防止value=" " 被转换为 {value:"",label:""} 
