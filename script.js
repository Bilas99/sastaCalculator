const display = document.querySelector('.display');
const autoCalculate = document.querySelector('.auto_calculate');
const btns = document.querySelectorAll('.btn');
    
		let previousKeyType = null;
		let isFloatingPoint = false;
		
		const updateDisplay = (num) => {
		   //if num and display value `0`
		   //return same like `0`
		   if (num === '0' && 
		       display.value === '0' ||
		       num === '00' && 
		       display.value === '0')
		       return;
		  
		   //if num `.` and isFloatingPoint
		   //return same like `7.7×7.`
		   if (num === '.' &&
		       isFloatingPoint) 
		       return;
		   
		   //if num `.` and display vlaue `0`
		   if (num === '.' && 
		       display.value === '0') {
		          display.value = '0.';
		          isFloatingPoint = true;
		          previousKeyType = 'number'
		          return;
		      }
		   //if num `.` and !isFloatingPoint
		   //and previousKeyType !operator
		   if (num === '.' && 
		       !isFloatingPoint &&
		       previousKeyType !== 'operator') {
		          display.value += '.';
		          isFloatingPoint = true;
		          previousKeyType = 'number'
		          return;
		      }
		    //if num `.` and !isFloatingPoint
		    //and previousKeyType operator
		    if(num === '.' &&
		       !isFloatingPoint &&
		       previousKeyType === 'operator') {
		          display.value += '0.';
		          isFloatingPoint = true;
		          previousKeyType = 'number'
		          return;
		      }
		   //if num !0 and display value 0
		   // 
		   if (num !== '0' && 
		       display.value === '0') {
		          display.value = num;
		          return;
		      }
		   display.value += num;
		   previousKeyType = 'number'
		};
		
		const handleMinusOperatorClick = (operator, val, lastVal) => {
		   //if last value `×` or `÷`
		   if(lastVal == '×' ||
		      lastVal == '÷') {
		      display.value += operator;
		      previousKeyType = 'operator'
		      return;
		   }
		   //if display value !0 and last value `+` or `-`
		   if (display.value !== '0' &&
		      lastVal == '+' ||
		      lastVal == '-') {
		      val.pop()
		      display.value = val.join('');
		      display.value += operator;
		      previousKeyType = 'operator'
		      return;
		   }
		   if (display.value === '0') {
		       display.value = operator;
		       previousKeyType = 'operator'
		       return;
		   }
		}
		
		const handleOperatorClick = (operator) => {
		   let val = Array.from(display.value)
		   let lastVal = val.slice(-1)
		   
		   if(previousKeyType === 'operator' && 
		      lastVal !== operator &&
		      operator !== '-') {
		         val.pop()
		         lastVal = val.slice(-1)
		      if(val.length === 0) return;
		      
		      if(lastVal == '×' ||
		         lastVal == '÷') {
		            val.pop()
		            display.value = val.join('');
		            display.value += operator;
		            previousKeyType = 'operator'
		      } else {
		         display.value = val.join('');
		         display.value += operator;
		         previousKeyType = 'operator'
		      }
		   }
		   if (operator === '-') {
		      handleMinusOperatorClick(operator,val, lastVal)
		   }
		   if (display.value !== '0' && 
		      previousKeyType !== 'operator') {
		      display.value += operator;
		      previousKeyType = 'operator'
		   }
		};
		
		
		const handleClearClick = () => {
		   display.value = '0';
		   autoCalculate.value = '';
		   previousKeyType = null;
		   isFloatingPoint = false;
		};
		
	const handleBackClick = () => {
	   //convert into Array the display.value
	   //and assign it in back variable
	   const back = Array.from(display.value)
	   
	   //remove last value and store it in lestDelete
	   //for checking isFolatingPoint
	   const lastDelete = back.pop()
	   
	   //if lastDelete value is '.' 
	   if (lastDelete == '.') {
	      isFloatingPoint = false;
	   }
	   
	   //check last value is a operator or number
	   if(back.slice(-1) == '+' ||
	      back.slice(-1) == '-' ||
	      back.slice(-1) == '×' ||
	      back.slice(-1) == '÷' ) {
	         previousKeyType = 'operator';
	   } else {
	         previousKeyType = 'number'
	   }
	      
	   //then convert into string 
	   //and passes the value 
	   //direct in display.value
	   display.value = back.join('');
	   
	   //if display.value blank
	   if (display.value === '') {
	      display.value = '0';
	   }
	   
	}
   const autoResult = () => {
      let val = display.value;
      let result ;
      if (previousKeyType === 'operator') {
         result = '';
      }else {
         val = val.replace(/×|÷/g, (match) => {
            if (match === '×') {
                return '*';
            } else {
               return '/';
            };
      });
      
         result = math.evaluate(val);
      }
      if (result == display.value ||
         result == 'Infinity'
        ) {
         autoCalculate.value = '';
      } else {
         autoCalculate.value = result;
      }
   }
   
   const handleEqualClick = () => {
      const isResultLength = autoCalculate.value.length;
      const len = display.value.length;
		      
		      if (len <= 10) {
		         display.style.fontSize = '3rem';
		      } else if(len > 10 && len <= 13) {
		         display.style.fontSize = '2.3rem';
		      } else if(len > 13) {
		         display.style.fontSize = '1.8rem';
		      }
      if (autoCalculate.value !== '') {
         
         display.value = '';
         
         autoCalculate.style.transform = 'translateY(-54px)';
         
         if (isResultLength <= 10 ) {
		         autoCalculate.style.fontSize = '3rem';
		         display.style.fontSize = '3rem';
		      } else if(isResultLength > 10 && isResultLength <= 13) {
		         autoCalculate.style.fontSize = '2.3rem';
		         display.style.fontSize = '2.3rem';
		      } else if(isResultLength > 13) {
		         autoCalculate.style.fontSize = '1.8rem';
		         display.style.fontSize = '1.8rem';
		      }
		        
         setTimeout(() =>  {
            display.value = autoCalculate.value;
            const len = display.value.length;
		      
		      if (len <= 10) {
		         display.style.fontSize = '3rem';
		      } else if(len > 10 && len <= 13) {
		         display.style.fontSize = '2.3rem';
		      } else if(len > 13) {
		         display.style.fontSize = '1.8rem';
		      }
            autoCalculate.value = '';
            autoCalculate.style.transform = 'translateY(0px)';
            autoCalculate.style.fontSize = '1.5rem';
         }, 500)
      }
      
   }
		btns.forEach((btn) => {
		   btn.addEventListener('click', (e) => {
		   const val = e.target.value;
		   
		   if (val === 'C') {
		      handleClearClick(); // Line num almost [121]
		   } else if (val === '←') {
		      handleBackClick(); //Line num almost [128]
		      autoResult(); //Line num almost [163]
		   } else if(val === '+' ||
		             val === '-' ||
		             val === '×' ||
		             val === '÷') {
		      isFloatingPoint = false;
		      handleOperatorClick(val); //Line num almost [87]
		   } else if (val === '=') {
		      handleEqualClick(); // Line num almost [184]
		   } else {
		      updateDisplay(val); // Line almost [07]
		      autoResult() //Line num almost [163]
		   }
		   });
		});
		
		btns.forEach((btn) => {
		   btn.addEventListener('click', () => {
		      const len = display.value.length;
		      
		      if (len <= 10) {
		         display.style.fontSize = '3rem';
		      } else if(len > 10 && len <= 13) {
		         display.style.fontSize = '2.3rem';
		      } else if(len > 13) {
		         display.style.fontSize = '1.8rem';
		      }
		   })
		})
