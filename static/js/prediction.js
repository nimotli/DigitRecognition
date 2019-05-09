$('#predictionPanel').hide()
    $('#prediction').hide()

    $('.digitImg').mouseover(function(){
        $(this).css('border','1px solid white') ;
    })
    $('.digitImg').mouseleave(function(){
        $(this).css('border','1px solid seagreen') ;
    })
    $('.digitImg').on('click',function(){
        predictImg($(this).attr('id'))
    })
    function predictImg(id)
    {
        var imgMat=imgToMatrix(id)
        $('#prediction').hide()
        $('#rotated').show(300)
        $('#predictionPanel').show(300)
        $.ajax({
            url: "/predict",
            type: "POST",
            data:{
                imageMatrixJs:imgMat
            },
            success: function(resp){
                $('#rotated').hide()
                $('#prediction').show(300)
                $('#prediction').text('The prediction is :'+resp)
                //$('#predictionPanel').show(300)
                //$('div#response').append(resp.data);
            }
        });
    }
    function imgToMatrix(myImageId)
    {
        // Get a reference to the image you want the pixels of and its dimensions
        var myImage=document.getElementById(myImageId)
        var w = myImage.width, h = myImage.height;
        // Create a Canvas element
        var canvas = document.createElement('canvas');
        //var canvas = document.getElementById('myCanv');
        // Size the canvas to the element
        canvas.width = w;
        canvas.height = h;

        // Draw image onto the canvas
        var ctx = canvas.getContext('2d');
        ctx.drawImage(myImage, 0, 0,w,h);

        // Finally, get the image data
        // ('data' is an array of RGBA pixel values for each pixel)
        var data = ctx.getImageData(0, 0, h, w);
        var imgArrGrey=[]
        for (let x = 0; x < h; x++) 
        {
            for (let y = 0; y < w; y++) 
            {
                pixelVal = data.data[((x * (w * 4)) + (y * 4)) + 2];
                imgArrGrey.push(pixelVal)
            }            
        }
        return JSON.stringify(imgArrGrey)
    }