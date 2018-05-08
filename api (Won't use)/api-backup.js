var listCards = document.getElementById('lista-cards')

$.ajax({
    url: 'https://pokeapi.co/api/v2/pokemon',
    crossDomain: true,
    success: function (resposta) {
        var resultados = resposta.results

        for (var i = 0; i < resultados.length; i++) {
            $.ajax({
                url: resultados[i].url,
                success: function (pokemon) {
                    $('#lista-cards').append(`
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
                                <a href="#" class="card-link">Tipo - ${pokemon.types[0].type.name}</a>
                            </div>
                        </div>
                    `)
                }
            })
        }
    }
})