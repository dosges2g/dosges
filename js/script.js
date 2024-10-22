



$(document).ready(function() {





    //ANIMACION LETRAS HOME
    setTimeout(() => {
        var spans = $('#dosges span, #menu span, #index a span, #about span, #menu-ph-btn span, #av-ph span');
        spans.each(function(index) {
            $(this).css('transform', 'translateY(0%)');
        });
        $('#about .proj_foto').css('opacity', '1');

        var currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'audiovisual.html') {
            $('#cellsAnim .cell').css('display', 'block');
            animateCells(true);
            $('#audiov').show();
        } else if (currentPage === 'playground.html') {
            $('#cellsAnim .cell').css('display', 'block');
            animateCells(true);
            $('#pg-container').css('display', 'flex');
        }
        

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

    setTimeout(() => {
        var spans = $('#avfirst span');
        spans.each(function(index) {
            $(this).css('transform', 'translateY(0%)');
        });
        $('#avfirstvid video').css('opacity', '1');
        $('#about .ab-ontop span').css('position', 'fixed');
        $('.ontop2').css('height', '3rem');
    }, 1600);


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
    function animateCells(showForScroll = true) {
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
            $(shuffledCells).css('background-color', 'var(--b)');
            $(shuffledCells).css('display', '');
            $('#coverDoble').hide();
            cellsAnim.hide();
            if (showForScroll) {
                $('#forscroll').show();
            }
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
                $(this).css('background-color', 'var(--b)');
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
    $('#dosges, #projs').click(function() {
        $('#transicion .cellT').css('display', 'block')
        transCurtain()
        setTimeout(() => {        
            if (currentProjectId) {
                $('#' + currentProjectId).addClass('hidden');
                currentProjectId = null;
            }
            window.location.href = 'index.html';
        }, 1300);

    });


    //AL PINCHAR EN UN PROYECTO EN EL INDEX
    var currentProjectId = null;

    $('#index a').click(function(event) {
        event.preventDefault(); 
        $('#cellsAnim .cell').css('display', 'block');
        var projectFull = $(this).data('project');
        $('#cover2').css('background-image', 'url(media/' + projectFull + '2_cover.webp)');
        $('#coverDoble').css('background-image', 'url(media/' + projectFull + '_cover.webp)');

        animateCells(true);

        setTimeout(() => { 
            $('main').css('background-image', 'none');
        }, 1500);     

    
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

        // miniaturas, title, desarrollo
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
            $('.scrmore').css('opacity', '1');
        } else {
            $('.title2').css('display', '')
            $('.scrmore').css('opacity', '');
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
        "mocha_in_3.mp4",
        "mocha_in_4.webp",
        "mocha_in_5.webp",
        "mocha_in_6.webp"
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
        "nova_in_4.webp",
        "nova_in_5.mp4",
        "nova_in_6.mp4",
        "nova_in_7.webp",
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

    const seguirMin = [
        "seguir_in_1.webp",
        "seguir_in_2.webp",
        "seguir_in_3.webp",
        "seguir_in_4.webp",
        "seguir_in_5.webp",
        "seguir_in_6.webp",
        "seguir_in_7.webp"
    ];

    const rifMin = [
        "rif_in_1.mp4",
        "rif_in_2.webp",
        "rif_in_3.mp4",
        "rif_in_4.mp4",
        "rif_in_5.webp",
        "rif_in_6.mp4",
        "rif_in_7.mp4",
        "rif_in_8.mp4"
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
            case 'seguir':
                return seguirMin;
            case 'rif':
                return rifMin;
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
        const mediaFiles = obtenerMedios(projId); 
        const columnCount = mediaFiles.length;
        $miniaturasContainer.css('grid-template-columns', `repeat(${columnCount}, 1fr)`);

        mediaFiles.forEach(file => {
            const $miniaturaDiv = $('<div class="miniatura"></div>');
            const fileExtension = file.split('.').pop().toLowerCase();
            
            if (['jpg', 'jpeg', 'png', 'webp'].includes(fileExtension)) {
                const $img = $(`<img src="media/${file}" alt="${file}">`);
                $miniaturaDiv.append($img);
            } else if (['mp4', 'webm', 'mov'].includes(fileExtension)) {
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
            $('.overlay img').hide(); 
            $('.overlay video').show().attr('src', mediaSrc); 
        } else {
            $('.overlay video').hide(); 
            $('.overlay img').show().attr('src', mediaSrc); 
        }
        $('.overlay').fadeIn();
        $('.overlay').css('display', 'flex');
    }

    // al pinchar en miniatura
    $(document).on('click', '.miniatura', function() {
        var mediaSrc;
        if ($(this).find('video').length) {
            mediaSrc = $(this).find('video').attr('src');
            showOverlay(mediaSrc, true); 
        } else {
            mediaSrc = $(this).find('img').attr('src');
            showOverlay(mediaSrc); 
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
            $('.overlay video').show().attr('src', mediaSrc); 
            $('.overlay img').hide(); 
        } else {
            mediaSrc = $(this).find('img').attr('src');
            $('.overlay img').show().attr('src', mediaSrc); 
            $('.overlay video').hide(); 
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
            $(shuffledCells2).css('background-color', 'var(--b)');
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

        if (nextProject.length === 0) {
            nextProject = $('.fullProj').first();
        }
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
            animateCells(true);
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
    

    
    $(window).on("scroll", function() {
        var $colLeft = $(".col-left");
        var $colRight = $(".col-right");

        var rect = $colLeft[0].getBoundingClientRect();
        var windowHeight = $(window).height();

        if (rect.bottom < windowHeight) {
            $colRight.css("position", "revert-layer");
        } else {
            $colRight.css("position", "sticky");
        }
    });




    //PLAYGROUND
    $('#playgr').click(function() {
        $('#transicion .cellT').css('display', 'block');
        transCurtain();

        var spans = $('#index').find('span');
        spans.each(function(index) {
            $(this).css('transform', 'translateY(100%)');
            $('#index').css('pointer-events', 'none');
        });

        setTimeout(() => {
            window.location.href = 'playground.html';
        }, 1300); 

    });
   

    $(document).ready(function() {
    
        const $playground = $('#playground');
        const $imageContainer = $('#image-container');
        const $selectedImage = $('#selected-image');
        const pgrows = 7;
        const pgcols = 7;
        let cellNumber = 1;

        const imageGroups = {
            'cortazar': ['pg_cortazar_1.webp', 'pg_cortazar_2.webp', 'pg_cortazar_3.webp', 'pg_cortazar_4.webp'],
            'yorokobu': ['pg_yorokobu_1.webp', 'pg_yorokobu_2.webp', 'pg_yorokobu_3.webp'],
            'trastulo': ['pg_trastulo_1.webp', 'pg_trastulo_2.webp'],
            'navajeros': ['pg_navajeros_1.webp', 'pg_navajeros_2.webp'],
            'inapa': ['pg_inapa.webp'],
            'kanai': ['pg_kanai.webp'],
            '4mot': ['pg_4mot_1.webp', 'pg_4mot_2.webp', 'pg_4mot_3.webp', 'pg_4mot_4.webp'],
            'col': ['pg_col_1.webp', 'pg_col_2.webp', 'pg_col_3.webp', 'pg_col_4.webp'],
        };

        const images = Object.values(imageGroups).flat();

        // numera las celdas y al hacer hover aparecen random cada vez 
        if ($playground.children().length === 0) {
            for (let row = 0; row < pgrows; row++) {
                for (let col = 0; col < pgcols; col++) {
                    const $cell = $('<div class="pgcell"></div>');
                    $cell.attr('data-number', `[${cellNumber}]`);

                    const $img = $('<img>').css('opacity', '0');
                    $cell.append($img);

                    $cell.on('mouseenter', function() {
                        const randomImage = getRandomImage();
                        $img.attr('src', `media/pg/${randomImage}`).css('opacity', '1'); // Imagen visible al hacer hover

                        setTimeout(() => {
                            $img.css('opacity', '0');
                        }, 2200);
                    });

                    // al hacer click en una celda se muestra su imagen en grande
                    $cell.on('click', function() {
                        const imgSrc = $img.attr('src');
                        if (imgSrc) {
                            let selectedGroup = null;
                            for (let group in imageGroups) {
                                if (imageGroups[group].includes(imgSrc.split('/').pop())) {
                                    selectedGroup = imageGroups[group];
                                    break;
                                }
                            }

                            if (selectedGroup) {
                                setTimeout(() => {
                                    var $cellsAnimOverlay = $('<div class="cellsAnim2"></div>');
                                    $selectedImage.parent().append($cellsAnimOverlay); 
                                    createCells($cellsAnimOverlay);  
                                    animateCells2($cellsAnimOverlay);
                                    
                                    $selectedImage.attr('src', imgSrc);
                                    setTimeout(() => {
                                        $('#close-icon').css('opacity', '1')
                                        $cellsAnimOverlay.remove();
                                    }, 700);

                                }, 500);

                                $imageContainer.css('display','flex');

                                // todas las celdas menos la fila1 se desplazan hacia abajo
                                $playground.find('.pgcell').each(function() {
                                    const cellNumber = $(this).data('number');
                                    $('#playground').css('border', 'none');
                                    if (cellNumber >= 8 && cellNumber <= 49) {
                                        $(this).css('transform', 'translateY(73vh)');
                                        $(this).css('transition', '.7s ease');
                                    }
                                });

                                // en las celdas 2-7 se muestran las miniaturas del grupo
                                for (let i = 0; i < selectedGroup.length; i++) {
                                    const $targetCell = $(`.pgcell:nth-child(${i + 1})`);  
                                    const $thumbnail = $('<img>').attr('src', `media/pg/${selectedGroup[i]}`).addClass('thumbnail');
                                    
                                    $targetCell.find('img').remove();
                                    
                                    $targetCell.append($thumbnail);
                                    setTimeout(() => {
                                        $thumbnail.css('opacity', '1');  
                                    }, 500);

                                    $targetCell.off('mouseenter mouseleave');  
                                    $targetCell.on('click', function() {
                                        const clickedImgSrc = $thumbnail.attr('src');
                                        if (clickedImgSrc) {
                                            $selectedImage.attr('src', clickedImgSrc); 
                                        }
                                    });
                                }
                                
                                $playground.find('.pgcell').off('mouseenter mouseleave');

                                // al cerrar en la X todo vuelve al inicio
                                $('#close-icon').on('click', function() {
                                    $imageContainer.css('opacity', '0');
                                    $imageContainer.css('transition', '.7s');
                                    $playground.find('.pgcell img.thumbnail').css('opacity', '0');
                                    $playground.find('.pgcell img.thumbnail').css('transition', '.7s'); 
                                    $('#playground').css('border', '');

                                    setTimeout(() => {
                                        $imageContainer.css('display', 'none');
                                        $imageContainer.css('opacity', '1');
                                        $playground.find('.pgcell img.thumbnail').remove();  
                                        $selectedImage.attr('src', '');  
                                        $playground.find('.pgcell').each(function() {
                                            const cellNumber = $(this).data('number');
                                            if (cellNumber >= 8 && cellNumber <= 49) {
                                                $(this).css('transform', 'translateY(0)');  
                                            }
                                        });

                                        $playground.find('.pgcell').each(function() {
                                            const $cell = $(this);
                                            $cell.on('mouseenter', function() {
                                                const randomImage = getRandomImage();
                                                $cell.find('img').attr('src', `media/pg/${randomImage}`).css('opacity', '1');
                                            });

                                            $cell.on('mouseleave', function() {
                                                setTimeout(() => {
                                                    $cell.find('img').css('opacity', '0');
                                                }, 2200);
                                            });
                                        });

                                    }, 700);
                                });
                            }
                        }
                    });
                    $playground.append($cell);
                    cellNumber++;
                }
            }
        }
        function getRandomImage() {
            const randomIndex = Math.floor(Math.random() * images.length);
            return images[randomIndex];
        }
    });
        




    // AV
    $('#av').click(function() {
        $('#transicion .cellT').css('display', 'block');
        transCurtain();
        
        var spans = $('#index').find('span');
        spans.each(function(index) {
            $(this).css('transform', 'translateY(100%)');
            $('#index').css('pointer-events', 'none');
        });

        setTimeout(() => {
            window.location.href = 'audiovisual.html';
        }, 1300); 

        $('#av').css({
            "pointer-events": "none"
        });
        $('#projs, #playgr').css({
            "text-decoration-color": ""
        });
    });

    $(document).ready(function() {

    // funcionamiento de cambio de proyecto en las cols
    $('.col-right .av-proj').not(':first').addClass('hidden').css('display', 'none');
    let avCurrentProject = '';

    $(window).on('scroll', function() {
        const scrollPosition = $(window).scrollTop();

        $('.col-left .av-proj').each(function(index) {
            const project = $(this);
            const offsetTop = project.offset().top;
            const projectHeight = project.outerHeight();

            if (scrollPosition >= offsetTop - window.innerHeight / 2 && scrollPosition < offsetTop + projectHeight) {
                const activeProject = project.attr('class').split(' ')[1]; 

                if (activeProject !== avCurrentProject) {
                    avCurrentProject = activeProject;
                    updateRightColumn(activeProject);
                }
            }
        });
    });

    function createRowsAnimation() {
        const $rowsAnim = $('#rowsAnim');
        $rowsAnim.empty();

        const rowCount = 10; 
        const rowHeight = 100 / rowCount + '%'; 

        for (let i = 0; i < rowCount; i++) {
            const row = $('<div class="row"></div>');
            row.css({
                height: rowHeight,
                backgroundColor: 'var(--b)'
            });
            $rowsAnim.append(row);
        }

        setTimeout(() => {
            $('#rowsAnim .row').each(function(index) {
                $(this).css('transition', `height 0.7s ease`);
                $(this).css('height', '0pt');
            });
        }, 500);
    }

    let isFirstUpdate = true;
    let currentProject = '';

    function updateRightColumn(project) {
        if (isFirstUpdate || project === currentProject) {
            currentProject = project; 
            if (isFirstUpdate) {
                isFirstUpdate = false; 
            }
            return; 
        }

        $('.col-right .av-proj').each(function() {
            $(this).addClass('hidden');
            $(this).css({
                'display': 'none',
                'height': '',
                'flex-direction': '',
                'justify-content': ''
            });
        });

        const $newProject = $(`.col-right .${project}`);
        $newProject.removeClass('hidden');
        $newProject.css({
            'height': '100vh',
            'display': 'flex',
            'flex-direction': 'column',
            'justify-content': 'space-between'
        });

        createRowsAnimation();
        previousProject = currentProject; 
        currentProject = project; 
    }
    });
    

    // ABOUT
    $('#abt').click(function() {
        $('#transicion .cellT').css('display', 'block');
        transCurtain();

        setTimeout(() => {
            window.location.href = 'about.html';
        }, 1300); 
        

    });


    // hora local en directo
    function updateTime() {
        const options = { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const currentTime = new Intl.DateTimeFormat([], options).format(new Date());
        $('#localtime').text(`${currentTime} MAD`);
    }

    setInterval(updateTime, 1000);
    updateTime();
    
   



    // responsive
    $('#menu-ph-btn').click(function() {
        $(this).hide();
        $('#menu').css('height', '9.5rem');
        $('#menu').css('padding', '1.5rem 1rem');
        var currentPage = window.location.pathname.split('/').pop();
            if (currentPage === 'index.html') {
                $('#projs').css('text-decoration-color', 'var(--b)');
            }else if (currentPage === 'playground.html') {
                $('#playgr').css('text-decoration-color', 'var(--b)');
            }else if (currentPage === 'audiovisual.html') {
                $('#av').css('text-decoration-color', 'var(--b)');
            }else if (currentPage === 'about.html') {
                $('#abt').css('text-decoration-color', 'var(--b)');
            }
        $('#projs, #playgr, #av, #abt').css('color', 'var(--b)');
        $('#projs, #playgr, #av, #abt').css('pointer-events', 'all');
        $('main #menu-ph #menu-ph-btn-close').css('display', 'block');
    })

    $('#menu-ph-btn-close').click(function() {
        $(this).hide();
        $('#menu').css('height', '');
        $('#menu').css('padding', '');
        $('#projs, #playgr, #av, #abt').css('color', '');
        $('#projs, #playgr, #av, #abt').css('pointer-events', '');
        $('#projs, #playgr, #av, #abt').css('text-decoration-color', 'transparent');
        $('main #menu-ph #menu-ph-btn').css('display', 'block');
    })

    $('.av-ph-top .av-proj').not(':first').addClass('hidden').css('display', 'none');
    let avCurrentProject = '';

    $(window).on('scroll', function() {
        const scrollPosition = $(window).scrollTop();

        $('.av-ph-all .av-proj').each(function(index) {
            const project = $(this);
            const offsetTop = project.offset().top;
            const projectHeight = project.outerHeight();

            if (scrollPosition >= offsetTop - window.innerHeight / 2 && scrollPosition < offsetTop + projectHeight) {
                const activeProject = project.attr('class').split(' ')[1]; 

                if (activeProject !== avCurrentProject) {
                    avCurrentProject = activeProject;
                    updateAvTop(activeProject);
                }
            }
        });
    });

    let isFirstUpdate = true;
    let currentProject = '';

    function updateAvTop(project) {
        if (isFirstUpdate || project === currentProject) {
            currentProject = project; 
            if (isFirstUpdate) {
                isFirstUpdate = false; 
            }
            return; 
        }

        $('.av-ph-top .av-proj').each(function() {
            $(this).addClass('hidden');
            $(this).css({
                'display': 'none',
            });
        });

        const $newProject = $(`.av-ph-top .${project}`);
        $newProject.removeClass('hidden');
        $newProject.css({
            'display': 'flex',
        });

        previousProject = currentProject; 
        currentProject = project; 
    }


    

});
