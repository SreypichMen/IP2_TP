<template>
   <div class="test2">
        <div class="container">
            <img src="@/assets/profile.png" alt="">
            <p class="text">Login Form</p>
            <form class="login">
                <div class="field">
                    <label>User Name</label>
                    <input type="text">
                    <br>
                    <label>Password</label>
                    <input type="password">
                    <input id="submit" type="submit" value="LOG IN">
                </div>
                <div class="forget">
                    <a href="#">Forgot password?</a>
                 </div>
            </form>
        </div>
    </div>
  
</template>
    <style>
        .test2{
           width: 50%;
            margin-right: 150px;
            margin-top: 80px
        }
        .container{
            border-radius: 30px;
            height: 450px;
            width: 350px;
            background-color: #2980b9;
            margin-left: auto;
            margin-right: auto;
        }
        .container img{
            height: 120px;
            width: 120px;
            border-radius: 50%;
            position: relative;
            left: 33%;
            margin-top: -67px;
        }
        .container .text{
            font-size: 30px;
            font-weight: 600;
            color: white;
            margin-left: 120px;
            margin-top: -5px;
            border-bottom: 2px solid;
            border-radius: 3px;
            width: 160px;
        }
        .field input{
            height: 40px;
            width: 75%;
            margin: 10px;
            margin-left: 45px;
            padding-left: 10px;
            color: white;
            border: 1px solid white;
            border-radius: 10px;
            background: transparent;
            
        }
        .field label{
            padding-bottom: 0px;
            font-size: 20px;
            margin-left:50px;
            color: white;
            
        }
        #submit{
            margin-left: 50px;
            align-items: center;
            font-size: 15px;
            cursor: pointer;
            margin-top: 40px;
        }
        .forget{
            margin-left: 60%;
            color: blue;
            
        }
        @media only screen and (max-width: 600px) {
     body {
    flex-direction: column;
  }
}
    </style>


