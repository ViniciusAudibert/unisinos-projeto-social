let listaDeCards = $('#lista-cards').append($('<div>').addClass('col-sm-12 d-flex justify-content-center').append(elementoLoader()))

$.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon',
    crossDomain: true,
    success: function (resposta) {
        var resultados = resposta.results

        listaDeCards.empty()
        for (let i = 0; i < resultados.length; i += 2) {
            let elementoColunaUm = elementoLoader()
            let elementoColunaDois = elementoLoader()

            let row = $('<div>').addClass('row')
            row.append($('<div>').addClass('col-sm-6').append(elementoColunaUm))
            row.append($('<div>').addClass('col-sm-6').append(elementoColunaDois))

            $('#lista-cards').append(row)

            $.ajax({
                url: resultados[i].url,
                crossDomain: true,
                success: function (pokemon) {

                    elementoColunaUm.html(pokemonCard(pokemon))

                    $.ajax({
                        url: resultados[i + 1].url,
                        crossDomain: true,
                        success: function (pokemon) {

                            elementoColunaDois.html(pokemonCard(pokemon))
                        }
                    })
                }
            })
        }
    }
})

function pokemonCard(pokemon) {
    return `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${pokemon.sprites.front_default}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${pokemon.name}</h5>
                <p class="card-text"></p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Experiencia base é de ${pokemon.base_experience}</li>
            </ul>
            <div class="card-body">
                <p class="card-link">Tipo - ${pokemon.types[0].type.name}</p>
                <button type="button" class="btn btn-info"><a style="color:white;" href="https://en.wikipedia.org/wiki/${pokemon.name}" target="_" class="card-link">Ver Detalhes</a></button>
            </div>
        </div>
    `
}

function elementoLoader() {
    return $(`
        <div class="card" style="width: 18rem;">
            <img src="Loading_icon.gif">
        </div>
    `)
}