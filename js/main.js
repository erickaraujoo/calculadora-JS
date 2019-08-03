$(function(){
    
    $('body').fadeOut(0).fadeIn(1500);
    
    /* Variáveis */
    var primeiroValor = 0, segundoValor = '', operacao, resultado, reduzValor1, reduzValor2, reduzResultado, key, apenasNumero, valorInput;
    
    /* Função iniciada ao pressionar uma tecla */
    $(document).on('keypress', function(){
        
        /* A caixa de texto recebe foco */
        $(".campo").focus();
        
        /* Variável para mostrar codigo da tecla */
        key = (window.event.keyCode);
        
        if (key && $('#resultado').attr('readonly') == "readonly"){
            primeiroValor = '';
            operacao = '';
            $("#op").text('');
        }
        
        $("#resultado").keyup(function(){
            apenasNumero = $("#resultado").val().replace(/[^0-9.– ]/g, '');
            $("#resultado").val(apenasNumero);
        });

        if (key == 43){ // Código da tecla "+"
            
            /* Para toda vez que queira somar, soma com o resultado */
            if ($('#resultado').attr('readonly') == "readonly"){
                $("#resultado").removeAttr('readonly');
                $("#resultado").val(resultado);
                $("#op").text('');
                primeiroValor = '';
            }
            
            /* Apenas insere se não ter nada */
            if(primeiroValor == ''){
                primeiroValor = $("#resultado").val();
            }

            reduzValor1 = primeiroValor.substr(0, 7); // Validação
            $("#resultado").val(''); // Esvaziando a caixa de texto 
            operacao = "adicao";

            if(primeiroValor != ''){
                if (primeiroValor.length > 8){ // Se primeiro valor ter mais que 8 numeros 
                    $("#op").text( reduzValor1 + '... + ' ); // Validação para o hostórico
                }else{
                    $("#op").text( primeiroValor + ' + ' ); // Validação
                };
            } else {
                alert("Insira um número para efetuar a operação"); // Validação
            };
        };
        if (key == 45){ // Código da tecla "-"
            
            /* Para toda vez que queira subtrir, subtrai com o resultado */
            if ($('#resultado').attr('readonly') == "readonly"){
                $("#resultado").removeAttr('readonly');
                $("#resultado").val(resultado);
                $("#op").text('');
                primeiroValor = '';
            }
            
            operacao = 'subtracao';
            if(primeiroValor == ''){
                primeiroValor = $("#resultado").val();
            }
            $("#resultado").val('');
        }
        if (key == 42){ // Código da tecla "*"
            
            /* Para toda vez que queira multiplicar, multiplica com o resultado */
            if ($('#resultado').attr('readonly') == "readonly"){
                $("#resultado").removeAttr('readonly');
                $("#resultado").val(resultado);
                $("#op").text('');
                primeiroValor = '';
            }
            
            operacao = 'multiplicacao';
            if(primeiroValor == ''){
                primeiroValor = $("#resultado").val();
            }
            $("#resultado").val('');
        };
        if (key == 47){ // Código da tecla "/"
            
            /* Para toda vez que queira dividir, divide com o resultado */
            if ($('#resultado').attr('readonly') == "readonly"){
                $("#resultado").removeAttr('readonly');
                $("#resultado").val(resultado);
                $("#op").text('');
                primeiroValor = '';
            }
            operacao = 'divisao';
            if(primeiroValor == ''){
                primeiroValor = $("#resultado").val();
            }
            $("#resultado").val('');
        };
        
        if (operacao != null){ // Verificando se contém um operador
            if (primeiroValor.length > 8){ // Validação do histórico com apenas 7 numeros
                reduzValor1 = primeiroValor.substr(0, 7);
                
                /* Mostrando o numero inserido + a operação que foi escolhida no histórico caso o numero for maior que 8 */
                if (operacao == 'adicao'){
                    $("#op").text( reduzValor1 + '... + ' )
                } else if (operacao == 'subtracao'){
                    $("#op").text(reduzValor1 + '... - ');
                } else if (operacao == 'multiplicacao'){
                    $("#op").text(reduzValor1 + '... x ');
                } else if (operacao == 'divisao'){
                    $("#op").text(reduzValor1 + '... ÷ ');
                }
                
            } else {
                
                /* Se for menor que 8, mostra normalmente */
                if (operacao == 'adicao'){
                    $("#op").text(primeiroValor + ' + ');
                } else if (operacao == 'subtracao'){
                    $("#op").text(primeiroValor + ' - ');
                } else if (operacao == 'multiplicacao'){
                    $("#op").text(primeiroValor + ' x ');
                } else if (operacao == 'divisao'){
                    $("#op").text(primeiroValor + ' ÷ ');
                }
            }
        }
        
        if (key == 13 ){ // Código da tecla "Enter" ou "Resultado"
            
            if($("#resultado").val() != ''){ // Validação da caixa de texto
                
                segundoValor = ($('#resultado').val());
                reduzValor2 = segundoValor.substr(0, 7); // O substr mostra apenas 7 numeros do total do segundoValor
                
                $("#resultado").attr('readonly', true); // Deixando a caixa de texto apenas para leitura 
                $("#resultado").val(''); // Limpando a caixa de texto 
                
                /* Fazendo a operação caso for soma */
                if(operacao == 'adicao'){
                    
                    resultado = parseFloat(primeiroValor) + parseFloat(segundoValor);
                    reduzResultado = resultado.toString().substr(0, 7);
                    
                    if (primeiroValor.length > 8 && segundoValor.length > 8){ // Se o primeiro e o segundo valor ter mais que 8 numeros 
                        reduzValor2 = segundoValor.substr(0, 7); // Validação
                        $("#op").text(reduzValor1 + '... + ' + reduzValor2 + '... = ' + resultado.toString().substr(0, 7) + '...'); // Validação 
                    } else if (primeiroValor.length < 8 && segundoValor.length > 8) { // Se o primeiro valor ter menos que 8 numeros e o segundo mais 
                        $("#op").text(primeiroValor + ' + ' + reduzValor2 + '... = ' + reduzResultado + '..'); // Validação 
                    } else if (primeiroValor.length > 8 && segundoValor.length < 8) { // Se o primeiro valor for maior que 8 numeros e o segundo menor 
                        $("#op").text(reduzValor1 + '... + ' + segundoValor + ' = ' + reduzResultado + '..'); // Validação 
                    } else {
                        $("#op").text(primeiroValor + ' + ' + segundoValor + ' = ' + resultado); // Mostrando de modo padrão
                    };
                    
                /* Fazendo a operação caso for subtração */
                } else if (operacao == 'subtracao'){
                    
                    resultado = parseFloat(primeiroValor) - parseFloat(segundoValor);
                    reduzResultado = resultado.toString().substr(0, 7);   
                    
                    if (primeiroValor.length > 8 && segundoValor.length > 8){ // Se o primeiro e o segundo valor ter mais que 8 numeros 
                        reduzValor2 = segundoValor.substr(0, 7); // Validação
                        if (resultado.toString().length > 8){ // Apenas se o resultado ter mais que 8 numeros 
                            $("#op").text(reduzValor1 + '... - ' + reduzValor2 + '... = ' + resultado.toString().substr(0, 7) + '...'); // Validação
                        } else{
                            $("#op").text(reduzValor1 + '... - ' + reduzValor2 + '... = ' + resultado); // Validação
                        }
                    } else if (primeiroValor.length < 8 && segundoValor.length > 8) { // Se o primeiro valor ter menos que 8 numeros e o segundo mais
                        $("#op").text(primeiroValor + ' - ' + reduzValor2 + '... = ' + reduzResultado + '..'); // Validação
                    } else if (primeiroValor.length > 8 && segundoValor.length < 8) { // Se o primeiro valor ter mais que 8 numeros e o segundo menos
                        $("#op").text(reduzValor1 + '... - ' + segundoValor + ' = ' + reduzResultado + '..'); // Validação
                    } else {
                        $("#op").text(primeiroValor + ' - ' + segundoValor + ' = ' + resultado);  // Validação
                    };
                    
                /* Fazendo a operação caso for multiplicacao */
                } else if (operacao == 'multiplicacao'){
                    resultado = parseFloat(primeiroValor) * parseFloat(segundoValor);
                    reduzResultado = resultado.toString().substr(0, 7);
                    
                    if (primeiroValor.length > 8 && segundoValor.length > 8){ // Se o primeiro e o segundo valor ter mais que 8 numeros 
                        $("#op").text(reduzValor1 + '... x ' + reduzValor2 + '... = ' + reduzResultado + '...'); // Validação
                    } else if (primeiroValor.length < 8 && segundoValor.length > 8) { // Se o primeiro valor ter menos que 8 numeros e o segundo mais
                        $("#op").text(primeiroValor + ' x ' + reduzValor2 + '... = ' + reduzResultado + '..'); // Validação
                    } else if (primeiroValor.length > 8 && segundoValor.length < 8) { // Se o primeiro valor ter mais que 8 numeros e o segundo menos
                        $("#op").text(reduzValor1 + '... x ' + segundoValor + ' = ' + reduzResultado + '..'); // Validação
                    } else {
                        if (resultado.toString().length > 8){ // Apenas se o resultado ter mais que 8 numeros 
                            $("#op").text(primeiroValor + ' x ' + segundoValor + ' = ' + reduzResultado + '...'); // Validação
                        } else {
                            $("#op").text(primeiroValor + ' x ' + segundoValor + ' = ' + resultado); // Mostrando de forma padrão
                        };
                    };
                    
                /* Fazendo a operação caso for divisão */
                } else if (operacao == 'divisao'){
                    resultado = parseFloat(primeiroValor) / parseFloat(segundoValor);
                    reduzResultado = resultado.toString().substr(0, 7);
                    
                    if (primeiroValor.length > 8 && segundoValor.length > 8 && resultado.toString().length > 8){ // Se os 3 valores forem maiores que 8
                        $("#op").text(reduzValor1 + '... ÷ ' + reduzValor2 + '... = ' + reduzResultado + '...'); // Validação
                    } else if (primeiroValor.length > 8 && segundoValor.length > 8) { // Se o primeiro e o segundo valor ter mais que 8 numeros 
                        $("#op").text(reduzValor1 + '... ÷ ' + reduzValor2 + '... = ' + resultado); // Validação
                    } else if (primeiroValor.length < 8 && segundoValor.length > 8) { // Se o primeiro valor ter menos que 8 numeros e o segundo mais
                        $("#op").text(primeiroValor + ' ÷ ' + reduzValor2 + '... = ' + resultado); // Validação
                    } else if (primeiroValor.length > 8 && segundoValor.length < 8) { // Se o primeiro valor ter mais que 8 numeros e o segundo menos
                        $("#op").text(reduzValor1 + '... ÷ ' + segundoValor + ' = ' + resultado); // Validação
                    } else {
                        if (resultado.toString().length > 8){
                            $("#op").text(primeiroValor + ' ÷ ' + segundoValor + ' = ' + reduzResultado + '...'); // Validação
                        } else {
                            $("#op").text(primeiroValor + ' ÷ ' + segundoValor + ' = ' + resultado); // Mostrando de forma padrão
                        };
                    };
                };
                
                /* Inserindo hifen caso o resultado for negativo */
                if (resultado < 0){
                    $("#resultado").val('– ' + resultado);
                } else{
                    $("#resultado").val(resultado);
                }
                
            };
        };
        
        /* Limpando a caixa de texto quando inserir um numero depois do resultado de um calculo */
        if ($('#resultado').attr('readonly') == "readonly" && $("#resultado").keypress){
            if(key != 13){ // Após o resultado, se pressionar alguma tecla a caixa de texto é limpa
                $("#resultado").val('');
                $('#resultado').removeAttr('readonly'); // Retira o readonly da caixa de texto
            };
        };
    });
    
    /* Inserindo o valor do botão no input text */
    $("input[name=btn]").click(function(){
        $("#resultado").val($("#resultado").val() + $(this).val());
    });
    
    /* Apagando o valor do input pelo click no botao CE */
    $("input[name=apagarTudo]").click(function(){
        $("#resultado").val('');
        $("#op").text('');
        primeiroValor = '';
        segundoValor = '';
        operacao = '';
    });
    
    /* Botão para somar */
    $(".adicao").click(function(){
        
        /* Para toda vez que queira somar, soma com o resultado */
        if ($('#resultado').attr('readonly') == "readonly"){
            $("#resultado").removeAttr('readonly');
            $("#resultado").val(resultado);
            $("#op").text('');
            primeiroValor = '';
        }
        
        /* Apenas insere se não ter nada */
        if(primeiroValor == ''){
            primeiroValor = $("#resultado").val();
        }
        
        reduzValor1 = primeiroValor.substr(0, 7); // Validação
        $("#resultado").val(''); // Esvaziando a caixa de texto 
        operacao = "adicao";

        if(primeiroValor != ''){
            if (primeiroValor.length > 8){ // Se primeiro valor ter mais que 8 numeros 
                $("#op").text( reduzValor1 + '... + ' ); // Validação para o hostórico
            }else{
                $("#op").text( primeiroValor + ' + ' ); // Validação
            };
        } else {
            alert("Insira um número para efetuar a operação"); // Validação
        };
    });
    
    /* Botão para subtrair */
    $("input[name=subtracao]").click(function(){
        
        /* Para toda vez que queira sutrair, subtrai com o resultado */
        if ($('#resultado').attr('readonly') == "readonly"){
            $("#resultado").removeAttr('readonly');
            $("#resultado").val(resultado);
            $("#op").text('');
            primeiroValor = '';
        }
        
        /* Apenas insere se não ter nada */
        if(primeiroValor == ''){
            primeiroValor = $("#resultado").val();
        }
        reduzValor1 = primeiroValor.substr(0, 7); // Validação
        $("#resultado").val(''); // Esvaziando a caixa de texto
        operacao = "subtracao";

        if(primeiroValor != ''){
            if (primeiroValor.length > 8){ // Se primeiro valor ter mais que 8 numeros
                $("#op").text( reduzValor1 + '... - ' ); // Validação para o hostórico
            }else{
                $("#op").text( primeiroValor + ' - ' ); // Validação
            };
        } else {
            alert("Insira um número para efetuar a operação"); // Validação
        };
    });
    
    /* Botão para multiplicar */
    $("input[name=multiplicacao]").click(function(){
        
        /* Para toda vez que queira multiplicar, multiplica com o resultado */
        if ($('#resultado').attr('readonly') == "readonly"){
            $("#resultado").removeAttr('readonly');
            $("#resultado").val(resultado);
            $("#op").text('');
            primeiroValor = '';
        }
        
        if(primeiroValor == ''){
            primeiroValor = $("#resultado").val();
        }
        reduzValor1 = primeiroValor.substr(0, 7); // Validação
        $("#resultado").val(''); // Esvaziando a caixa de texto
        operacao = "multiplicacao";

        if(primeiroValor != ''){
            if (primeiroValor.length > 8){ // Se primeiro valor ter mais que 8 numeros
                $("#op").text( reduzValor1 + '... x ' ); // Validação para o hostórico
            }else{
                $("#op").text( primeiroValor + ' x ' ); // Validação
            };
        } else {
            alert("Insira um número para efetuar a operação"); // Validação
        };
    });
    
    /* Botão para dividir */
    $("input[name=divisao]").click(function(){
        
        /* Para toda vez que queira dividir, divide com o resultado */
        if ($('#resultado').attr('readonly') == "readonly"){
            $("#resultado").removeAttr('readonly');
            $("#resultado").val(resultado);
            $("#op").text('');
            primeiroValor = '';
        }
        
        if(primeiroValor == 0){
            primeiroValor = $("#resultado").val();
        }
        reduzValor1 = primeiroValor.substr(0, 7); // Validação
        $("#resultado").val('');
        operacao = "divisao";

        if(primeiroValor != ''){
            if (primeiroValor.length > 8){ // Se primeiro valor ter mais que 8 numeros
                $("#op").text( reduzValor1 + '... ÷ ' ); // Validação para o hostórico
            }else{
                $("#op").text( primeiroValor + ' ÷ ' ); // Validação
            };
        } else {
            alert("Insira um número para efetuar a operação"); // Validação
        };
    });
    
    /* Botão do resultado */
    $(".igual").click(function(){
        
        if($("#resultado").val() != ''){ // Validação
                
            segundoValor = ($('#resultado').val()); // Inserindo o valor da caixa no segundo valor
            reduzValor2 = segundoValor.substr(0, 7); // Validação 

            $("#resultado").attr('readonly', true); // Inserindo apenas leitura na caixa de texto
            $("#resultado").val(''); // Limpando o valor da caixa

            /* Se for adição, soma */
            if(operacao == 'adicao'){

                resultado = parseFloat(primeiroValor) + parseFloat(segundoValor); // Soma dos numeros
                reduzResultado = resultado.toString().substr(0, 7); // Validação 

                if (primeiroValor.length > 8 && segundoValor.length > 8){ // Se o primeiro e o segundo valor ter mais que 8 numeros
                    reduzValor2 = segundoValor.substr(0, 7); // Validação
                    $("#op").text(reduzValor1 + '... + ' + reduzValor2 + '... = ' + resultado.toString().substr(0, 7) + '...'); // Validação
                } else if (primeiroValor.length < 8 && segundoValor.length > 8) { // Se o primeiro valor ter menos que 8 numeros e o segundo ter mais
                    $("#op").text(primeiroValor + ' + ' + reduzValor2 + '... = ' + reduzResultado + '..'); // Validação
                } else if (primeiroValor.length > 8 && segundoValor.length < 8) { // Se o primeiro valor ter mais que 8 numeros e o segundo ter menos
                    $("#op").text(reduzValor1 + '... + ' + segundoValor + ' = ' + reduzResultado + '..'); // Validação
                } else {
                    $("#op").text(primeiroValor + ' + ' + segundoValor + ' = ' + resultado); // Mostrando de forma padrão
                };
                
            /* Se for menos, subtrai */
            } else if (operacao == 'subtracao'){
                resultado = parseFloat(primeiroValor) - parseFloat(segundoValor); // Subtração dos numeros
                reduzResultado = resultado.toString().substr(0, 7); // Validação

                if (primeiroValor.length > 8 && segundoValor.length > 8){ // Se o primeiro e o segundo valor ter mais que 8 numeros
                    reduzValor2 = segundoValor.substr(0, 7);
                    if (resultado.toString().length > 8){
                        $("#op").text(reduzValor1 + '... - ' + reduzValor2 + '... = ' + resultado.toString().substr(0, 7) + '...'); // Validação
                    } else{
                        $("#op").text(reduzValor1 + '... - ' + reduzValor2 + '... = ' + resultado); // Validação
                    }
                } else if (primeiroValor.length < 8 && segundoValor.length > 8) { // Se o primeiro valor ter menos que 8 numeros e o segundo ter mais
                    $("#op").text(primeiroValor + ' - ' + reduzValor2 + '... = ' + reduzResultado + '..'); // Validação
                } else if (primeiroValor.length > 8 && segundoValor.length < 8) { // Se o primeiro valor ter mais que 8 numeros e o segundo ter menos
                    $("#op").text(reduzValor1 + '... - ' + segundoValor + ' = ' + reduzResultado + '..'); // Validação
                } else {
                    $("#op").text(primeiroValor + ' - ' + segundoValor + ' = ' + resultado); // Mostrando de forma padrão
                };

            /* Se for vezes, multiplica */
            } else if (operacao == 'multiplicacao'){
                
                resultado = parseFloat(primeiroValor) * parseFloat(segundoValor); // Multiplicação dos numeros
                reduzResultado = resultado.toString().substr(0, 7); // Validação

                if (primeiroValor.length > 8 && segundoValor.length > 8){ // Se o primeiro e o segundo valor ter mais que 8 numeros
                    $("#op").text(reduzValor1 + '... x ' + reduzValor2 + '... = ' + reduzResultado + '...'); // Validação
                } else if (primeiroValor.length < 8 && segundoValor.length > 8) { // Se o primeiro valor ter menos que 8 numeros e o segundo ter mais
                    $("#op").text(primeiroValor + ' x ' + reduzValor2 + '... = ' + reduzResultado + '..'); // Validação
                } else if (primeiroValor.length > 8 && segundoValor.length < 8) { // Se o primeiro valor ter mais que 8 numeros e o segundo ter menos
                    $("#op").text(reduzValor1 + '... x ' + segundoValor + ' = ' + reduzResultado + '..'); // Validação
                } else {
                    if (resultado.toString().length > 8){
                        $("#op").text(primeiroValor + ' x ' + segundoValor + ' = ' + reduzResultado + '...'); // Validação
                    } else {
                        $("#op").text(primeiroValor + ' x ' + segundoValor + ' = ' + resultado); // Mostrando de forma padrão
                    };
                };

            /* Se for divisao, divide */
            } else if (operacao == 'divisao'){
                resultado = parseFloat(primeiroValor) / parseFloat(segundoValor); // Divisao dos numeros 
                reduzResultado = resultado.toString().substr(0, 7); // Validação

                if (primeiroValor.length > 8 && segundoValor.length > 8 && resultado.toString().length > 8){ // Validação dos tres valores
                    $("#op").text(reduzValor1 + '... ÷ ' + reduzValor2 + '... = ' + reduzResultado + '...'); // Validação
                } else if (primeiroValor.length > 8 && segundoValor.length > 8) { // Se o primeiro e o segundo valor ter mais que 8 numeros
                    $("#op").text(reduzValor1 + '... ÷ ' + reduzValor2 + '... = ' + resultado); // Validação
                } else if (primeiroValor.length < 8 && segundoValor.length > 8) { // Se o primeiro valor ter menos que 8 numeros e o segundo ter mais
                    $("#op").text(primeiroValor + ' ÷ ' + reduzValor2 + '... = ' + resultado); // Validação
                } else if (primeiroValor.length > 8 && segundoValor.length < 8) { // Se o primeiro valor ter mais que 8 numeros e o segundo ter menos
                    $("#op").text(reduzValor1 + '... ÷ ' + segundoValor + ' = ' + resultado); // Validação
                } else {
                    if (resultado.toString().length > 8){
                        $("#op").text(primeiroValor + ' ÷ ' + segundoValor + ' = ' + reduzResultado + '...'); // Validação
                    } else {
                        $("#op").text(primeiroValor + ' ÷ ' + segundoValor + ' = ' + resultado); // Mostrando de forma padrão 
                    };
                };
            };
            
            /* Retornando por fim o resultado */
            $("#resultado").val(resultado); 
        };
    });
    
    /* Depois da caixa estiver com apenas leitura, remove-o por meio do 'click' nos botões */
    $("input[name=btn]").click(function(){
        if ($('#resultado').attr('readonly') == "readonly"){
            resultado = $(this).val(); // Recebendo o valor do botão
            $("#resultado").val(resultado);
            $("#op").text(''); // Limpando o histórico
            
        };
    })
    
    /* Apagando um caractere pelo valor C */
    $("input[name=apagar]").click(function(){
        valorInput = $("#resultado").val();
        $("#resultado").val(valorInput.substring(0, valorInput.length - 1));
    });
});

/* ---------------------------------------------------------- Erick Araujo Barbosa -------------------------------------------------------------- */
 /* ---------------------------------------------------------- 20/06/2019 - 21:15 -------------------------------------------------------------- */




