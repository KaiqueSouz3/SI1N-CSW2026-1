document.addEventListener("DOMContentLoaded", () => {
    const selectDia = document.getElementById("dia");
    const selectMes = document.getElementById("mes");
    const selectAno = document.getElementById("ano");
    const btnCalcular = document.getElementById("btn-calcular");
    const divResultado = document.getElementById("resultado");

    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    // Popula os selects dinamicamente
    function popularSelects() {
        // Dias (1 a 31)
        for (let i = 1; i <= 31; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.textContent = i < 10 ? `0${i}` : i;
            selectDia.appendChild(option);
        }

        // Meses (1 a 12)
        for (let i = 1; i <= 12; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.textContent = i < 10 ? `0${i}` : i;
            selectMes.appendChild(option);
        }

        // Anos (Ano atual até 1900)
        const anoAtual = new Date().getFullYear();
        for (let i = anoAtual; i >= 1900; i--) {
            let option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            selectAno.appendChild(option);
        }
    }

    // Função de cálculo de idade
    function calcularIdade() {
        const diaNasc = parseInt(selectDia.value);
        const mesNasc = parseInt(selectMes.value);
        const anoNasc = parseInt(selectAno.value);

        const hoje = new Date();
        const diaAtual = hoje.getDate();
        const mesAtual = hoje.getMonth() + 1; // no JS getMonth() começa do 0
        const anoAtual = hoje.getFullYear();

        // Verifica se a data faz sentido (ex: 31 de Fevereiro)
        const diasNoMes = new Date(anoNasc, mesNasc, 0).getDate();
        if (diaNasc > diasNoMes) {
            divResultado.innerHTML = `<span style="color: #dc2626;">Data inválida! O mês selecionado possui apenas ${diasNoMes} dias.</span>`;
            return;
        }

        // Subtrai o ano do nascimento do ano atual
        let idade = anoAtual - anoNasc;

        // Se ainda não chegou no mês de aniversário, ou se está no mês mas não chegou no dia, subtrai 1
        if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
            idade--;
        }

        // Formatação limpa para exibir na div de resultado
        const dataNascFormatada = `${diaNasc < 10 ? '0' + diaNasc : diaNasc} de ${nomesMeses[mesNasc - 1]} de ${anoNasc}`;
        const dataAtualFormatada = `${diaAtual < 10 ? '0' + diaAtual : diaAtual} de ${nomesMeses[mesAtual - 1]} de ${anoAtual}`;

        // Insere as informações no HTML
        divResultado.innerHTML = `
            <p>Data de Nascimento: <strong>${dataNascFormatada}</strong></p>
            <p>Data de Hoje: <strong>${dataAtualFormatada}</strong></p>
            <p style="margin-top: 10px; font-size: 12pt;">Você tem <strong>${idade} anos</strong> de idade.</p>
        `;
    }

    popularSelects();
    btnCalcular.addEventListener("click", calcularIdade);
});