const display = document.querySelector('.display');
const runtimeResult = document.querySelector('.autoResult');
const btns = document.querySelectorAll('.btn');
    
		let previousKeyType = null;
		let isFloatingPoint = false;
		
		const updateDisplay = (num) => {
		   //if num and display value '0'
		   //return same like 0
		   if (num === '0' && 
		       display.value === '0' ||
		       num === '00' && 
		       display.value === '0')
		       return;
		   
		   //if num '.' and isFloatingPoint
		   //return same like 7.7×7.
		   if (num === '.' &&
		       isFloatingPoint) 
		       return;
		   
		   //if num '.' and display vlaue '0' 
		   if (num === '.' && 
		       display.value === '0') {
		          display.value = '0.';
		          isFloatingPoint = true;
		          previousKeyType = 'number'
		          return;
		      }
		   //if num '.' and !isFloatingPoint
		   //and previousKeyType !operator
		   if (num === '.' && 
		       !isFloatingPoint &&
		       previousKeyType !== 'operator') {
		          display.value += '.';
		          isFloatingPoint = true;
		          previousKeyType = 'number'
		          return;
		      }
		    //if num '.' and !isFloatingPoint
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
		   
		   if(lastVal == '×' ||
		      lastVal == '÷') {
		      display.value += operator;
		      previousKeyType = 'operator'
		      return;
		   }
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
		       console.log('yesss')
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
		   runtimeResult.value = '';
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
         if (previousKeyType === 'operator') {
            val += 0;
         }
          val = val.replace(/×|÷/g, (match) => {
             if (match === '×') {
                return '*';
             } else {
                return '/';
             };
          });
      let res = math.evaluate(val)
      if (display.value == res ||
          res == '') {
         runtimeResult.value = '';
      } else {
         runtimeResult.value = res;
      }
   }
   
   const handleEqualClick = () => {
      display.value = '';
      runtimeResult.style.transform = 'translateY(-54px)';
      runtimeResult.style.fontSize = '3rem';
        
      setTimeout(() =>  {
         display.value = runtimeResult.value;
         runtimeResult.value = '';
         runtimeResult.style.transform = 'translateY(0px)';
         runtimeResult.style.fontSize = '1.5rem';
      }, 500)
   }
		btns.forEach((btn) => {
		   btn.addEventListener('click', (e) => {
		   const val = e.target.value;
		   
		   if (val === 'C') {
		      handleClearClick(); // Line allmost [69]
		   } else if (val === '←') {
		      handleBackClick(); //Line allmost [75]
		      autoResult();
		   } else if(val === '+' ||
		             val === '-' ||
		             val === '×' ||
		             val === '÷') {
		      isFloatingPoint = false;
		      handleOperatorClick(val);
		   } else if (val === '=') {
		      handleEqualClick(); // Line allmost [99]
		   } else {
		      updateDisplay(val); // Line allmost [07]
		      autoResult()
		   }
		   });
		});
		
