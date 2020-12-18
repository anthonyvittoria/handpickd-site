let jsonResponse;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sendApiRequest() {
    let url = 'https://nailsource-api.herokuapp.com/';
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

async function updatePageContent() {
    sendApiRequest();

    while (!jsonResponse) {
    document.getElementById('productCatalog').innerHTML = '<h5 style="display: flex; justify-content: center; align-items: center; height: 100%; color: gray">Loading...</h5>';
    await sleep(50);
    }

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
    document.getElementById('productCatalog').innerHTML = html;
    jsonResponse = '';
}

$('#getStarted').click(function() {
    $('#stageZero').fadeOut('fast');
    $('#stageOne').fadeIn(1000);
});

$('#btnPicker').click(function() {
    $('#stageOne').fadeOut('fast');
    $('#stageTwoPicker').fadeIn(1000);
});

// TODO: add code for image upload button