let jsonResponse;
// let imageLoader = document.getElementById('formFile');

// imageLoader.addEventListener('change', handleImage, false);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sendApiRequest() {
    let url = 'https://handpickd.herokuapp.com/';
    fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        'r': Math.round(color[0]),
        'g': Math.round(color[1]),
        'b': Math.round(color[2])
    })
    })
    .then(response => response.json())
    .then(json => jsonResponse = json)
    .catch(err => console.log(err));
}

async function updatePageContent(stage) {
    sendApiRequest();

    while (!jsonResponse) {
        if (stage == 1) {
            document.getElementById('productCatalog1').innerHTML = '<h5 style="display: flex; justify-content: center; align-items: center; height: 100%; color: gray">Loading...</h5>';
        } else {
            document.getElementById('productCatalog2').innerHTML = '<h5 style="display: flex; justify-content: center; align-items: center; height: 100%; color: gray">Loading...</h5>';
        }
    await sleep(50);
    }
    // console.log(jsonResponse);

    let html = '<ul class="list-group-flush">';
    for (key in jsonResponse) {
    html += `<li class="list-group-item w-100 py-4">`;
    html += `<a target="_blank" href="${jsonResponse[key].product_url}">`
    html += `<img src="${jsonResponse[key].shade_url}" alt="shade" width="50px" style="float: left;"></a>`;
    html += `<a target="_blank" href="${jsonResponse[key].product_url}" style="color:#CE428A;">`;
    if (jsonResponse[key].name.length > 40) {
        html += `<p style="margin-left: 80px;"><b>${jsonResponse[key].name.substring(0,40) + '...'}</b></p>`;
    } else {
        html += `<p style="margin-left: 80px;"><b>${jsonResponse[key].name}</b></p>`;
    }
    html += `</a>`;
    html += `<p style="margin-left: 80px;">Brand: ${jsonResponse[key].brand}</p>`;
    html += `<p style="margin-left: 80px;">Shade: ${jsonResponse[key].shade}</p>`;
    html += `<p style="margin-left: 80px;">Price: ${jsonResponse[key].price}</p>`;
    html += `</li>`;
    }
    html += '</ul>';

    if (stage == 1) {
        document.getElementById('productCatalog1').innerHTML = html;
    } else {
        document.getElementById('productCatalog2').innerHTML = html;
    }

    jsonResponse = '';
}

// function handleFile(input) {
//     let file = input.files[0];
//     let ext = file.name.split('.').pop().toLowerCase();
//     console.log(ext);
//     console.log(typeof ext);
    // if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
        // document.getElementById('filetypeAlert').style.display = 'none';
        // document.getElementById('stageTwoImageText').style.display = 'none';
        // document.getElementById('formFile').classList.add('mt-4');
//         // code
//     } else {
//         document.getElementById('filetypeAlert').style.display = 'inherit';
//         document.getElementById('stageTwoImageText').style.display = 'none';
//         // document.getElementById('stageTwoImageText').classList.add('mt-3');
//     }
// }

$('#getStarted').click(function() {
    $('#stageZero').fadeOut('fast');
    $('#stageOne').fadeIn(1000);
});

$('#btnPicker').click(function() {
    updatePageContent(1);
    $('#stageOne').fadeOut('fast');
    $('#switchToImage').css('display', 'inherit');
    $('#stageTwoPicker').fadeIn(1000);
});

$('#btnImage').click(function() {
    $('#stageOne').fadeOut('fast');
    $('#switchToPicker').css('display', 'inherit');
    $('#stageTwoImage').fadeIn(1700);
});

$('#switchToPicker').click(function() {
    updatePageContent(1);
    pickr.color = color;
    $('#stageTwoImage').fadeOut('fast');
    $('#stageTwoPicker').fadeIn(1000);
    $('#switchToPicker').hide();
    $('#switchToImage').show();
});

$('#switchToImage').click(function() {
    $('#stageTwoPicker').fadeOut('fast');
    $('#stageTwoImage').fadeIn(1700);
    $('#switchToImage').hide();
    $('#switchToPicker').show();
});


$(document).ready(function () {
    $('#productCatalog2').html('<h5 style="display: flex; justify-content: center; align-items: center; height: 100%; color: gray">Upload an image to select a color!</h5>');
})