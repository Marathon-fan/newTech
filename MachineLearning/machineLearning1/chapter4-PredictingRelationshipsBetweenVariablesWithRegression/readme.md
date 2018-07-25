
////-----------------------------------overview   

1 recongize regression problems in different fields: from Quant Trading to demand forecasting.   

2 understand how to set up a Regression problem - dependent and indenpendent variables.  

3 Contrast classification and regression and when each technique should be used.  



////-----------------------------------Examples of regression problems.    
1 what will be the returns from a stock on a given date?    
2 If waiting time increases, how does this affect customer satisfaction?    
3 what will be the sales of this product in a given week?    


////-----------------------------------A regression problem statement.  
compute some continuous value.   
1 stock returns   
2 sales   

quantify the relationship between 2 variables
1 wait time -> customer satisfaction    


////-----------------------------------stock returns for a given day might depend on a number of variables   

var1 day of the week   
var2 day of the month   
var3 daily stock returns in the last 1 week  

The stock returns on a given day are a fucntion of these variables    
 
Regression is the process that identifies this function    


The input(var1, var2, var3) is called independent variables   
The output is called dependent variable



////-----------------------------------Types of regression   
1 linear regression    
2 polynomial regression   
3 non-linear regression    



////-----------------------------------Demand forecasting   
sales at a future time might depend on  
1 sales in the previous week   
2 expected marketing spend   
3 holidays  








////-----------------------------------predicting stock returns   
the capital asset pricing model   

used for pricing risky securities   

Ri = Rf + BETAi * (Rm - Rf)

Ri : the return on a security   
Rf: the risk free rate of return   
BETAi * (Rm - Rf): premium  
BETAi: the volatility of the security(a measure of risk)   it can tell you how much risk a security adds to a portfolio    
Beta quantifies the relationship between stock returns and market returns  

(Rm - Rf): expected return of the market over and above the risk free rate  
Rm: Expected return of the market over and above the risk free rate   
Rf: 

use regression to find the value of Beta  


////-----------------------------------Detecting facial features  
teach a computer to identify eyes, nose, mouth   

1 facial recognition   
2 virtual dressing rooms  
3 auto-capture photos  

find the co-ordinates of the important facial features   

their position depends on  
1 relative position within the picture   
2 the properties of surrounding pixels   


The co-ordinates of each feature can be found using one regression problem    


size of the picture + grayscale value of each pixel ----> regression function  ----> left eye center co-ordiantes (dependent variable)



////-----------------------------------Contrasting Classification and Regression    

same steps :    
1 define the problem   
2 represent the training data and test data using numercial attributes   
3 "train a model" using the training data   
4 "test the model" using test data   

problem statement:   
the problem statement in classification ---  assign a category/label   
the problem statement in Regression ---  compute a continuous value       

features:  
in classification ---  the problem instance represented using numeric attributes   
in Regression ---  the independent vairables          

training:   
in classification ---  use training data to build a classifier      
in Regression ---  use training data to quantify the relationship between variables. Regression is also a form of supervised learning               

test:   
in classification ---  assign a label for a new instance         
in Regression ---  compute output value given the independent variables                  

classification vs Regression   
in classification ---  a categorical output    
                       relationship between input and output: usually a black box       
in Regression ---  a continuous output    
                   relationship between input and output: a mathematical function       


////-----------------------------------summary    






////-----------------------------------





////-----------------------------------




////-----------------------------------





////-----------------------------------





////-----------------------------------


