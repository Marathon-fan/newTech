
////-----------------------------------overview   

1 understand how linear regression can be applied to find the Beta of a stock  
2 understand the stochastic gradient method of linear regression  
3 tweak the parameters of SGD for better performance  
4 implement Linear Regression in Python  


////-----------------------------------

Regression helps you quantify the relationship between different variables  

Regression starts by assuming a specific form for this function   


////-----------------------------------

function
b0 + b1 * x1 + b2 * x2 + ...

These b's are called co-efficients    

////-----------------------------------example: Demand forecasting    

Sales = 2 * Marketing spend + 0.5 * sales of last week  




////-----------------------------------The CAPM Model  

Ri = Rf + BETAi * (Rm - Rf)

Ri - Rf =  BETAi * (Rm - Rf) // this looks vary  like linear regression   

This a simple linear Regression with 1 variable   

Error: the left over parts of the dependent variable, not explained by the independent variables. Also called Residuals   



////-----------------------------------Minimize Error   
Linear Regression tries to minimize this error for the training data    

One such technique is Stochastic Gradient Descent    

Error = (1 / N) * Sigma( Ei * Ei),    i from 1 to N, N is the number of historical datapoints    


////-----------------------------------Stochastic Gradient Descent    

The graph represents the error for different values of the slope and intercept   

1 initialize some value for the slope and intercept   

2 find the current value of the error function   

3 find the slope at the current point and move slightly downwards in that direction   

4 repeat until you reach a minimum (or) stop after certain number of iterations   




////-----------------------------------Finding the Beta for the stock of Google   

Ri - Rf =  BETAi * (Rm - Rf)   

Ri - Rf : returns of Google - Risk Free Rate   

(Rm - Rf): returns of an index that represents the market - Risk Free Rate   

we will use NASDAQ index     


////-----------------------------------   
step1: download historical prices for google and Nasdaq from a financial site(Yahoo Finance)   
2012 - 2018    

step2: convert the prices to returns   

Monthly return = (new price - old price) / old price  

Google return is a dependent variable   
Nasdaq return is an independent variable   


step3: compute the risk free rate of return using the yields of 5 year Treasury bonds   

The Adj.Close column represents the yield percentage    
Divide by 100 to compute the yield   

step4: subtract the yields from Google and Nasdaq returns   

1) use google returns to subtract the TreasuryBonds
2) use nasdaq  returns to subtract the TreasuryBonds

then we get (GOOG r-rf) and (Nasdql rm-rf)    

step5: regress the adjusted Google returns against adjusted Nasdaq returns   
SGDRegressor from the Scikit-Learn Package   


////-----------------------------------Demo    

1 Compute the Returns of Google, Nasdaq and 5 year treasury bonds   
2 implement Linear Regression with SGD in Python   







////-----------------------------------





////-----------------------------------





////-----------------------------------




////-----------------------------------




////-----------------------------------





////-----------------------------------





////-----------------------------------




////-----------------------------------




////-----------------------------------





////-----------------------------------





////-----------------------------------


