class Renderer {

    renderLang(languages) {
        let source = $("#language-discovery-template").html()
        let template = Handlebars.compile(source)
        let newHTML = template({ languages })
        
        $(".flags-container").append(newHTML)

    }

    renderGenres(genres) {

        let source = $("#genre-discovery-template").html()
        let template = Handlebars.compile(source)
        let newHTML = template({ genres })
        
        $("#discovery-container").append(newHTML)
    }


    renderDiscovered(podcasts) {
        let source = $("#discover-podcasts-template").html()
        let template = Handlebars.compile(source)
        let newHTML = template({ podcasts })
        
        $(".carousel-container").empty().append(newHTML)
    }

    renderSaved(podcasts) {
        let source = $("#saved-podcasts-template").html()
        let template = Handlebars.compile(source)
        let newHTML = template({ podcasts })
        
        $("#favorited").empty().append(newHTML)
    }

    renderListened(podcasts) {
        let source = $("#listened-podcasts-template").html()
        let template = Handlebars.compile(source)
        let newHTML = template({ podcasts })
        
        $("#recently-played").empty().append(newHTML)
    }

    renderData(data) {
        let source = $("#podcasts-template").html()
        let template = Handlebars.compile(source)
        let newHtml = template({data})
        $(".podcasts").empty().append(newHtml)
    }
}