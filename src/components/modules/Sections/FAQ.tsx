// src/components/modules/Sections/FAQ.tsx
'use client';

import { useState } from "react";
import { IoChevronDownOutline } from 'react-icons/io5'; // Importando um ícone de seta

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const faqItems: FAQItem[] = [
    {
        id: "faq1",
        question: "Porque esse conhecimento está sendo compartilhado?",
        answer: "O conhecimento está sendo compartilhado porque 'viver uma vida sem se relacionar é NÃO VIVER'. Após identificar falhas em diversos homens na hora de se relacionar, surgiu a ideia de criar uma metodologia que funcione para qualquer pessoa, ajudando-as a conquistar e ter relações com qualquer mulher."
    },
    {
        id: "faq2",
        question: "Já sei como conquistar algumas mulheres, porém não me considero um especialista, esse método pode me ajudar?",
        answer: "Sim, o método pode te ajudar. Ele já auxiliou centenas de homens a se destravarem e melhorarem suas investidas com as mulheres. Dificilmente você não terá sucesso utilizando este material."
    },
    {
        id: "faq3",
        question: "Em quanto tempo vou ter resultados com o que vou aprender com 'O código da coragem'?",
        answer: "Seguindo o passo a passo, você verá resultados aplicando o método logo nas primeiras semanas, lembrando que o sucesso depende somente de você."
    },
    {
        id: "faq4",
        question: "Como saber se 'O código da coragem' pode me ajudar?",
        answer: "Se você está em busca de como aprender a conquistar qualquer mulher em qualquer ocasião, então 'O Código da Coragem' pode te ajudar. Este método foi criado para funcionar para qualquer pessoa que deseje conquistar e ter relações."
    },
    {
        id: "faq5",
        question: "Quais são os conteúdos do curso e como eles serão liberados?",
        answer: "O conteúdo será liberado em uma área de membros exclusiva e individual. O acesso será enviado pelo e-mail que você cadastrar no momento da compra."
    },
];

export default function FAQ() {
    // Estado para controlar qual item do FAQ está aberto. Armazena o 'id' do item aberto.
    const [openFAQId, setOpenFAQId] = useState<string | null>(null);

    const toggleFAQ = (id: string) => {
        setOpenFAQId(prevId => (prevId === id ? null : id));
    };

    return (
        <section className="relative w-full py-20 px-4 bg-black overflow-hidden">
            {/* Título da seção FAQ */}
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
                style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.4)' }}>
                Perguntas Frequentes
            </h2>

            {/* Container principal para os itens do FAQ */}
            <div className="max-w-4xl mx-auto">
                {faqItems.map((item) => (
                    // Item individual do FAQ
                    <div
                        key={item.id}
                        className={`
                            border-b border-gray-700 // Borda inferior discreta
                            cursor-pointer
                            // Sem background ou sombra no item para um visual mais limpo
                        `}
                        // O onClick é no cabeçalho para seguir a estrutura mais fielmente
                    >
                        {/* Cabeçalho da pergunta - clicável */}
                        <button
                            className={`
                                w-full flex justify-between items-center text-left
                                py-5 px-0 // Padding superior/inferior para o botão da pergunta
                                text-xl font-semibold
                                transition-colors duration-200 ease-in-out
                                ${openFAQId === item.id ? 'text-[#E53935]' : 'text-white'} // Cor laranja para pergunta ativa
                                hover:text-[#f02323] // Laranja no hover
                            `}
                            onClick={() => toggleFAQ(item.id)}
                        >
                            <span>{item.question}</span>
                            <IoChevronDownOutline
                                className={`
                                    transform transition-transform duration-300
                                    ${openFAQId === item.id ? "rotate-180 text-[#F04E23]" : "text-white"} // Ícone branco, laranja quando ativo
                                `}
                                size={28}
                            />
                        </button>

                        {/* Conteúdo da resposta - com transição de altura */}
                        <div
                            className={`
                                text-gray-300 text-lg
                                overflow-hidden
                                transition-all duration-500 ease-in-out // Animação mais suave e lenta
                                ${openFAQId === item.id ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 py-0"} // py-4 quando aberto, py-0 quando fechado
                            `}
                        >
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}