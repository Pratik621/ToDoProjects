let otp;

        function generateOtp() {
            otp = Math.floor(1000 + Math.random() * 9000);
            document.getElementById("outDisplay").textContent = otp;
            document.getElementById("message").textContent = "";
            document.getElementById("otpInput").value = "";
        }

        function checkOtp() {
            let userInput = document.getElementById("otpInput").value;
            let message = document.getElementById("message");

            if(userInput === otp.toString()) {
                message.style.color = "green";
                message.textContent = "✅ Your OTP is correct!";
                window.location.href = "success.html";
            } else {
                message.style.color = "red";
                message.textContent = "❌ Incorrect OTP, please try again!";
            }
        }

        // Generate OTP on page load
        generateOtp();