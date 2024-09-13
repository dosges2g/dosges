



$(document).ready(function() {





    //ANIMACION LETRAS HOME
    setTimeout(() => {
        var spans = $('#dosges span, #menu span, #index a span');
        spans.each(function(index) {
            $(this).css('transform', 'translateY(0%)');
        });

        //HOVER DEL INDEX
        $('#index a').hover(
            function() {
                var projectImage = $(this).data('project');
                $('main').css('background-image', 'url(media/' + projectImage + '_cover.webp)');
                $(this).css('color', '#c0c0c0');
            },
            function() {
                $('main').css('background-image', 'none');
                $(this).css('color', '');
            }
        );
    }, 300);


    //CELLSANIM AL PINCHAR PROYECTO
    //crear cuadricula
    const rows = 20;
    const cols = 20;
    const cellsAnim = $('#cellsAnim');
    const transition = $('#transicion')

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = $('<div class="cell"></div>');
            cell.css({
                top: (i * 5) + '%',
                left: (j * 5) + '%'
            });
            cellsAnim.append(cell);
        }
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cellT = $('<div class="cellT"></div>');
            cellT.css({
                top: (i * 5) + '%',
                left: (j * 5) + '%'
            });
            transition.append(cellT);
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    //funcion animateCells
    function animateCells() {
        var cells = cellsAnim.find('.cell');
        var shuffledCells = shuffle(cells.toArray());
        var totalCells = rows * cols;
        var animationDuration = 1500; 
        var delay = animationDuration / totalCells;

        cellsAnim.show();

        $(shuffledCells).each(function(index) {
            setTimeout(() => {
                $(this).css('background-color', 'transparent');
            }, index * delay);
            
        });
        
        setTimeout(() => {
            $(shuffledCells).css('background-color', '#ebebe9');
            $(shuffledCells).css('display', '');
            $('#coverDoble').hide();
            cellsAnim.hide();
            $('#forscroll').show();
        }, animationDuration + 500);
    }


    // CORTINA DE TRANSICION ENTRE PÁGINAS
    function transCurtain() {
        var cellsT = transition.find('.cellT');
        var shuffledCellsT = shuffle(cellsT.toArray());
        var totalCellsT = rows * cols;
        var animationDuration = 1300; 
        var delay = animationDuration / totalCellsT;

        transition.show();

        $(shuffledCellsT).each(function(index) {
            setTimeout(() => {
                $(this).css('background-color', '#ebebe9');
            }, index * delay);
            
        });
        
        setTimeout(() => {
            $(shuffledCellsT).css('background-color', 'transparent');
            $(shuffledCellsT).css('display', '');
            transition.hide();
            $('.desarrollo').hide();
        }, animationDuration + 700);
    }


    // VOLVER A HOME CON DOSGES
    $('#dosges').click(function() {
        $('#transicion .cellT').css('display', 'block')
        transCurtain()
        setTimeout(() => {        
            if (currentProjectId) {
                $('#' + currentProjectId).addClass('hidden');
                currentProjectId = null;
            }
            location.reload();
        }, 1300);

    });



    //AL PINCHAR EN UN PROYECTO EN EL INDEX
    var currentProjectId = null;

    $('#index a').click(function() {
        event.preventDefault(); 
        $('#cellsAnim .cell').css('display', 'block')
        var projectFull = $(this).data('project');
        $('#cover2').css('background-image', 'url(media/' + projectFull + '2_cover.webp)');
        $('#coverDoble').css('background-image', 'url(media/' + projectFull + '_cover.webp)');

        animateCells();
    
        var spans = $('#index').find('span');
        spans.each(function(index) {
            $(this).css('transform', 'translateY(100%)');
            $('#index').css('pointer-events', 'none');
        });

        if (currentProjectId) {
            $('#' + currentProjectId).addClass('hidden');
        }

        $('#' + projectFull).removeClass('hidden');
        currentProjectId = projectFull;

        $('#projs').css({
            "text-decoration-color": "#000"
        });

    });

    
    
    // ACCIONES CON SCROLL 
    $(window).scroll(function() {
        const cover2 = $('#cover2');
        const cover2Height = cover2.height();
        const scrollTop = $(this).scrollTop();
        const windowHeight = $(window).height();
        const documentHeight = $(document).height();
        const tolerance = 5;
        
        
        // reducir cover2
        if (scrollTop > cover2Height / 4) {
            cover2.css('background-size', '8%');
        } else {
            cover2.css('background-size', '100%');
        }

        // miniaturas, title, desarrollo, foto5over
        if (cover2.css('background-size') === '8%') {
            showMiniaturas();
            cover2.css('opacity', '0');
            $('.desarrollo').show();
            $('.title').css('color', 'rgb(203 203 203)')
        } else {
            hideMiniaturas();
            cover2.css('opacity', '1');
            $('.desarrollo').hide();
            $('.title').css('color', '')
        }

        if (scrollTop + windowHeight >= documentHeight - tolerance) {
            $('.title').css('color', '');
            $('.title2').css('display', 'block');
        } else {
            $('.title2').css('display', '')
        }

        // title2: next project
        $('.title2').on('scroll', function() {
            var element = $(this);
            var scrollTop = element.scrollTop();
            var scrollHeight = element[0].scrollHeight;
            var elementHeight = element.height();
            var tolerance = 5


            if (scrollTop + elementHeight >= scrollHeight - tolerance) {
                $('.title2txt').css('transform', 'scaleY(1)');
                $('.title1').css('transform', 'scaleY(0)');
                $('.title1').css('bottom', '-1.5rem');
            } else if (scrollTop + elementHeight < scrollHeight){
                $('.title2txt').css('transform', '');
                $('.title1').css('transform', 'scaleY(1)');
                $('.title1').css('bottom', '');
            }
        });
    });

   

    // MINIATURAS DINAMICAS    
    const loeweMin = [
        "loewe_in_1.webp",
        "loewe_in_2.webp",
        "loewe_in_3.webp",
        "loewe.webp",
        "loewe_in_4_0.mp4"
    ];

    const querenciaMin = [
        "querencia_in_1.webp",
        "querencia_in_2.webp",
        "querencia_in_3.webp",
        "querencia_in_4.webp",
        "querencia_in_6.webp"
    ];

    const mochaMin = [
        "mocha_in_1.webp",
        "mocha_in_2.webp",
        "mocha_in_3.webp",
        "mocha_in_4.webp",
        "mocha_in_5.webp",
        "mocha_in_6_0.mp4"
    ];

    const lukinikMin = [
        "lukinik_in_1.webp",
        "lukinik_in_2.webp",
        "lukinik_in_3.webp",
        "lukinik_in_1.webp",
        "lukinik_in_4.webp",
        "lukinik_in_5.webp",
        "lukinik_in_6.webp",
        "lukinik_in_7.webp",
        "lukinik_in_8.webp",
        "lukinik_in_9.webp"
    ];

    const trizaMin = [
        "triza_in_1.webp",
        "triza_in_2.webp",
        "triza_in_3.webp",
        "triza_in_4.webp",
        "triza_in_5.webp",
        "triza_in_6.webp",
        "triza_in_7.webp",
        "triza_in_8.webp"
    ];

    const nandosMin = [
        "nandos_in_1.webp",
        "nandos_in_2.webp",
        "nandos_in_3.webp",
        "nandos_in_4.webp",
        "nandos_in_5.webp"
    ];

    const novaMin = [
        "nova_in_1.mp4",
        "nova_in_2.mp4",
        "nova_in_3.mp4",
        "nova_in_4.mp4",
        "nova_in_5.mp4"
    ];

    const fikaMin = [
        "fika_in_1.webp",
        "fika_in_2.webp",
        "fika_in_3.webp",
        "fika_in_4.mp4",
        "fika_in_5.webp",
        "fika_in_6.webp",
        "fika_in_7.webp"
    ];

    let currentImageFiles = [];

    function obtenerMedios(projId) {
        switch (projId) {
            case 'loewe':
                return loeweMin;
            case 'querencia':
                return querenciaMin;
            case 'mocha':
                return mochaMin;
            case 'lukinik':
                return lukinikMin;
            case 'triza':
                return trizaMin;
            case 'nandos':
                return nandosMin;
            case 'nova':
                return novaMin;
            case 'fika':
                return fikaMin;
            default:
                return [];
        }
    }

    function actualizarMiniaturas(projId) {
        const $miniaturasContainer = $('.fullProj:not(.hidden) .miniaturas');
        if ($miniaturasContainer.length === 0) {
            return;
        }

        $miniaturasContainer.empty();
        const mediaFiles = obtenerMedios(projId); // Debe devolver tanto imágenes como videos
        const columnCount = mediaFiles.length;
        $miniaturasContainer.css('grid-template-columns', `repeat(${columnCount}, 1fr)`);

        mediaFiles.forEach(file => {
            const $miniaturaDiv = $('<div class="miniatura"></div>');
            const fileExtension = file.split('.').pop().toLowerCase();
            
            if (['jpg', 'jpeg', 'png', 'webp'].includes(fileExtension)) {
                // Crear miniatura de imagen
                const $img = $(`<img src="media/${file}" alt="${file}">`);
                $miniaturaDiv.append($img);
            } else if (['mp4', 'webm', 'mov'].includes(fileExtension)) {
                // Crear miniatura de video
                const $video = $(`<video src="media/${file}" alt="${file}" muted></video>`);
                $miniaturaDiv.append($video);
            }

            $miniaturasContainer.append($miniaturaDiv);
        });

        currentImageFiles = mediaFiles.map(file => file.split('/').pop());
    }

    function checkVisibleProject(mutationsList, observer) {
        const projActual = $('.fullProj:not(.hidden)');
        if (projActual.length > 0) {

            const projActualId = projActual.attr('id');
            actualizarMiniaturas(projActualId);

            // Desconectar el observer cuando se encuentra un elemento
            observer.disconnect();
        }
    }

    const observer1 = new MutationObserver(checkVisibleProject);
    function startObserver() {
        observer1.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
    }

    checkVisibleProject();
    startObserver();

        
    




    // MOSTRAR MINIATURAS
    function showMiniaturas() {
        var miniaturas = $('.miniaturas');
        var divs = miniaturas.find('div').toArray();
        var shuffledDivs = shuffle(divs);
        var totalDuration = 800;
        var delay = totalDuration / shuffledDivs.length;

        miniaturas.addClass('show');

        $(shuffledDivs).each(function(index) {
            setTimeout(() => {
                $(this).addClass('show');
            }, index * delay);
        });
    }

    // ESCONDER MINIATURAS
    function hideMiniaturas() {
        var miniaturas = $('.miniaturas');
        miniaturas.removeClass('show');
        miniaturas.find('div').removeClass('show');
    }

    // OVERLAY
   function showOverlay(mediaSrc, isVideo = false) {
        if (isVideo) {
            $('.overlay img').hide(); // Oculta la imagen
            $('.overlay video').show().attr('src', mediaSrc); // Muestra el video y actualiza la fuente
        } else {
            $('.overlay video').hide(); // Oculta el video
            $('.overlay img').show().attr('src', mediaSrc); // Muestra la imagen y actualiza la fuente
        }
        $('.overlay').fadeIn();
        $('.overlay').css('display', 'flex');
    }

    // al pinchar en miniatura
    $(document).on('click', '.miniatura', function() {
        var mediaSrc;
        if ($(this).find('video').length) {
            mediaSrc = $(this).find('video').attr('src');
            showOverlay(mediaSrc, true); // Se trata de un video
        } else {
            mediaSrc = $(this).find('img').attr('src');
            showOverlay(mediaSrc); // Se trata de una imagen
        }
    });

    // al pinchar en imagen
    $(document).on('click', 'img', function() {
        var mediaSrc = $(this).attr('src');
        var mediaName = mediaSrc.split('/').pop();
        if (currentImageFiles.includes(mediaName)) {
            showOverlay(mediaSrc);
        }
    });

    // al pinchar en video
    $(document).on('click', 'video', function() {
        var mediaSrc = $(this).attr('src');
        showOverlay(mediaSrc, true);
    });

    // manejo de carrusel con hover en miniaturas
    $(document).on('mouseenter', '.miniatura', function() {
        if ($('.overlay').css('display') === 'flex') {
        var mediaSrc;
        if ($(this).find('video').length) {
            mediaSrc = $(this).find('video').attr('src');
            $('.overlay video').show().attr('src', mediaSrc); // Mostrar el video en el overlay
            $('.overlay img').hide(); // Ocultar la imagen si había alguna
        } else {
            mediaSrc = $(this).find('img').attr('src');
            $('.overlay img').show().attr('src', mediaSrc); // Mostrar la imagen en el overlay
            $('.overlay video').hide(); // Ocultar el video si había alguno
        }
    }
    });

    // salir del overlay
    $('.overlay').on('click', function(event) {
        if (!$(event.target).is('img') && !$(event.target).is('video')) {
            $('.overlay').fadeOut();
        }
    });


    // ANIMATECELLS2 PARA LAS IMÁGENES QUE APARECEN
    // crear animacion
    const rows2 = 10;
    const cols2 = 10;

    function createCells(cellsAnim2) {
        for (let i = 0; i < rows2; i++) {
            for (let j = 0; j < cols2; j++) {
                const cell2 = $('<div class="cells2"></div>');
                cell2.css({
                    top: (i * 10) + '%',
                    left: (j * 10) + '%'
                });
                cellsAnim2.append(cell2);
            }
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function animateCells2(cellsAnim2) {
        var cells2 = cellsAnim2.find('.cells2');
        var shuffledCells2 = shuffle(cells2.toArray());
        var totalCells2 = rows2 * cols2;
        var animationDuration2 = 500;
        var delay2 = animationDuration2 / totalCells2;

        cellsAnim2.show();
        $(shuffledCells2).each(function(index) {
            setTimeout(() => {
                $(this).css('background-color', 'transparent');
            }, index * delay2);
        });

        setTimeout(() => {
            $(shuffledCells2).css('background-color', '#ebebe9');
            cellsAnim2.hide();
        }, animationDuration2 + 200);
    }

    // llamar a la animacion cuando las imagenes aparecen un 50%
    var $elements = $('section.desarrollo div.proj_foto');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var $target = $(entry.target);

                if (!$target.hasClass('animated')) {
                    $target.addClass('visible animated'); 

                    // Crear el div hijo .cellsAnim2
                    var $cellsAnimOverlay = $('<div class="cellsAnim2"></div>');
                    createCells($cellsAnimOverlay);
                    $target.append($cellsAnimOverlay);

                    animateCells2($cellsAnimOverlay);

                    setTimeout(() => {
                        $cellsAnimOverlay.remove();
                    }, 700); 
                    
                    txt0onView();

                    var mediaSrc = $target.find('img, video').attr('src');
                    var minSrc = $('.miniaturas img[src="' + mediaSrc + '"], .miniaturas video[src="' + mediaSrc + '"]');
                    minSrc.parent().css('opacity', 1);
                }
            }
        });
    }, {
        threshold: 0.5 
    });

    $elements.each(function() {
        observer.observe(this);
    });

    function txt0onView() {
        var foto0 = $('.foto0.proj_foto');
        if (foto0.hasClass('visible')) {
            setTimeout(() => {
                $('.txt0 div').css('opacity', '1')
            }, 1300); 
        }
    }


    // ANIMACION PERSIANAS PARA EL TEXTO QUE APARECE
    // crear animacion
    const createTextRows = (spanElement) => {
        const fontSize = parseFloat(spanElement.css('font-size'));
        const spanHeight = spanElement.height();
        const rowCount = Math.ceil(spanHeight / fontSize);
        
        const $rowsContainer = $('<div class="rowsContainer"></div>');
        for (let i = 0; i < rowCount; i++) {
            const row = $('<div class="textRow"></div>');
            row.css({
                top: (i * fontSize) + 'pt',
                height: fontSize + 'pt'
            });
            $rowsContainer.append(row);
        }
        
        spanElement.append($rowsContainer);
    };

    const animateTextRows = (spanElement) => {
        const rows = spanElement.find('.textRow');
        const waitTime = spanElement.hasClass('wait') ? 900 : 400;
        const animationDuration = 700;

        $(rows).each(function(index) {
            setTimeout(() => {
                $(this).css('transition', `height ${animationDuration}ms`);
                $(this).css('height', '0pt');
            }, waitTime);
        });

        setTimeout(() => {
            $(rows).css('height', '');
        }, animationDuration + waitTime);
    };

    // llamar a la animacion de texto cuando este entero visible
    var $textElements = $('section.desarrollo div.proj_txts span');
    var textObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var $target = $(entry.target);

                if (!$target.hasClass('animated')) {
                    $target.addClass('visible animated'); 

                    createTextRows($target);

                    animateTextRows($target);

                    setTimeout(() => {
                        $target.find('.rowsContainer').remove();
                    }, 1300); 
                }
            }
        });
    }, {
        threshold: 1
    });

    $textElements.each(function() {
        textObserver.observe(this);
    });

    

    // REPRODUCIR VIDEO SI ESTA VISIBLE
    var videos = $('.video video');

    function checkVideoInView() {
        videos.each(function() {
            var video = $(this)[0];
            var rect = video.getBoundingClientRect();
            var inView = (
                rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom > 0 &&
                rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
                rect.right > 0
            );
            if (inView) {
                video.play();
            } else {
                video.pause();
            }
        });
    }

    $(window).on('scroll resize', checkVideoInView);
    checkVideoInView();



    // NEXT PROJECT
    $('.title2txt').click(function(){
        var currentProject = $('.fullProj:not(.hidden)');
        var nextProject = currentProject.next('.fullProj');
        var nextProjectId = nextProject.attr('id');

        $('#transicion .cellT').css('display', 'block')
        transCurtain();
        textObserver.disconnect();
        observer.disconnect();

        setTimeout(() => {        
            currentProject.addClass('hidden');
            
            hideMiniaturas();

            $(window).scrollTop(0);
            $('#cover2').css({
                'background-size': '100%',
                'opacity': '1',
                'background-image': 'url(media/' + nextProjectId + '2_cover.webp)',
            });    
            $('.desarrollo').hide();
            $('.title2txt').css('transform', '');
            $('.title1').css('transform', 'scaleY(1)');
            $('.title1').css('bottom', '');

            startObserver();

            var spans = $('#dosges span, #menu span');
            spans.each(function(index) {
                $(this).css('transform', 'translateY(100%)');
                $(this).css('transition', 'transform 0.2s ease-in-out');
            });

            nextProject.removeClass('hidden');

        }, 1400);

        setTimeout(() => {        
            $('#cellsAnim .cell').css('display', 'block')
            animateCells();
        }, 2000);

        setTimeout(() => {
            var spans = $('#dosges span, #menu span');
            spans.each(function(index) {
                $(this).css('transform', 'translateY(0%)');
                $(this).css('transition', 'transform 1.2s ease-in-out');
            });
            $textElements.removeClass('visible animated');
            $textElements.each(function() {
                textObserver.observe(this);
            });

            $elements.removeClass('visible animated');
            $elements.each(function() {
                observer.observe(this);
            });
        }, 3000);


    });
    

    


});

$(window).on("scroll", function() {
    var $colLeft = $(".col-left");
    var $colRight = $(".col-right");

    var rect = $colLeft[0].getBoundingClientRect();
    var windowHeight = $(window).height();

    // Si la parte inferior de .col-left ya ha pasado el borde superior del viewport
    if (rect.bottom < windowHeight) {
        // Se quita el sticky
        $colRight.css("position", "revert-layer");
    } else {
        // Sigue siendo sticky
        $colRight.css("position", "sticky");
    }
});