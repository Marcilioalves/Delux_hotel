let Validator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        Validator.clearErrors();

        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = Validator.checkInput(input);
            if(check !== true) {
                send = false;
                Validator.showError(input, check);
            }
        }

        if(send) {
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo não pode ser vazio.';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'Campo tem que ter pelo menos '+rDetails[1]+' caractes';
                        }
                    break;
                    case 'email':
                        if(input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido!';
                            }
                        }
                    break;
                }
            }
        }

        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0;i<errorElements.length;i++) {
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.validator');
form.addEventListener('submit', Validator.handleSubmit);
// MASCARA DE CEP

const handleZipCode = (event) => {
    let input = event.target
    input.value = zipCodeMask(input.value)
  }
  
  const zipCodeMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{5})(\d)/,'$1-$2')
    return value
  }

  //MASCARA DE VALOR
  function moeda(a, e, r, t) {
    let n = "",
       h = j = 0,
       u = tamanho2 = 0,
       l = ajd2 = "",
       o = window.Event ? t.which : t.keyCode;
    if (13 == o || 8 == o)
       return !0;
    if (n = String.fromCharCode(o),
       -1 == "0123456789".indexOf(n))
       return !1;
    for (u = a.value.length,
       h = 0; h < u && ("0" == a.value.charAt(h) || a.value.charAt(h) == r); h++);
    for (l = ""; h < u; h++) - 1 != "0123456789".indexOf(a.value.charAt(h)) && (l += a.value.charAt(h));
    if (l += n, 0 == (u = l.length) && (a.value = ""), 1 == u && (a.value = "0" + r + "0" + l), 2 == u && (a.value = "0" + r + l), u > 2) {
       for (ajd2 = "",
          j = 0,
          h = u - 3; h >= 0; h--)
          3 == j && (ajd2 += e,
             j = 0),
          ajd2 += l.charAt(h),
          j++;
       for (a.value = "",
          tamanho2 = ajd2.length,
          h = tamanho2 - 1; h >= 0; h--)
          a.value += ajd2.charAt(h);
       a.value += r + l.substr(u - 2, u)
    }
    return !1
 }