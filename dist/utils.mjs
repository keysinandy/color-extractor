var a=function(a){var r=a.r,e=a.g,t=a.b;r/=255,e/=255,t/=255;var n,c,i=Math.max(r,e,t),s=Math.min(r,e,t),u=(i+s)/2;if(i===s)n=c=0;else{var b=i-s;switch(c=u>.5?b/(2-i-s):b/(i+s),i){case r:n=(e-t)/b+(e<t?6:0);break;case e:n=(t-r)/b+2;break;case t:n=(r-e)/b+4;break;default:n=0}n/=6}return[n,c,u]},r=function(r){return a(r)[2]<.5};export{r as isDark,a as rgbToHsl};
