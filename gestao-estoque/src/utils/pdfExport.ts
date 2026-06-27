import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Produto, Movimentacao } from '../context/EstoqueContext';

export const exportarProdutosPDF = (produtos: Produto[]) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Banner superior com a cor da marca
  doc.setFillColor(53, 37, 205); // Brand color #3525cd
  doc.rect(0, 0, 210, 35, 'F');

  // Título
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('GESTOR - CONTROLE DE ESTOQUE', 14, 15);

  // Subtítulo
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text('Relatório de Inventário de Produtos', 14, 23);

  // Metadados (Canto direito do cabeçalho)
  doc.setFontSize(9);
  const dataGeracao = new Date().toLocaleString('pt-BR');
  doc.text(`Gerado em: ${dataGeracao}`, 145, 15);
  doc.text(`Total de Itens: ${produtos.length}`, 145, 21);
  const totalItensQtd = produtos.reduce((acc, p) => acc + p.quantidade, 0);
  doc.text(`Total Unidades: ${totalItensQtd}`, 145, 27);

  // Colunas e linhas da tabela
  const headers = ['ID', 'Produto', 'Categoria', 'Qtd Atual', 'Qtd Mín', 'Qtd Máx', 'Preço Custo', 'Valor Total'];
  
  const rows = produtos.map((p) => {
    const valorTotalEstoque = p.quantidade * p.precoCusto;
    return [
      p.id,
      p.nome,
      p.categoria,
      `${p.quantidade} un`,
      `${p.estoqueMinimo} un`,
      `${p.estoqueMaximo} un`,
      p.precoCusto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      valorTotalEstoque.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    ];
  });

  // Valor total acumulado do estoque a preço de compra
  const totalValorEstoque = produtos.reduce((acc, p) => acc + p.quantidade * p.precoCusto, 0);

  // Gerar tabela autoTable
  autoTable(doc, {
    startY: 42,
    head: [headers],
    body: rows,
    theme: 'striped',
    headStyles: {
      fillColor: [53, 37, 205],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'left',
    },
    columnStyles: {
      0: { cellWidth: 15 }, // ID
      3: { halign: 'right' }, // Qtd Atual
      4: { halign: 'right' }, // Qtd Min
      5: { halign: 'right' }, // Qtd Max
      6: { halign: 'right' }, // Preço Custo
      7: { halign: 'right' }, // Valor Total
    },
    styles: {
      fontSize: 8.5,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: [245, 242, 255], // Cor de destaque suave #f5f2ff
    },
    margin: { left: 14, right: 14 },
    didDrawPage: (data) => {
      // Rodapé com paginação dinâmica
      const totalPages = doc.getNumberOfPages();
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(119, 117, 135);
      doc.text(
        `Gestão de Estoque - Relatório de Inventário | Página ${data.pageNumber} de ${totalPages}`,
        14,
        doc.internal.pageSize.getHeight() - 10
      );
    },
  });

  // Adicionar resumo financeiro ao final do documento
  const finalY = (doc as any).lastAutoTable.finalY || 45;
  const pageHeight = doc.internal.pageSize.getHeight();
  
  if (finalY + 30 > pageHeight) {
    doc.addPage();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(53, 37, 205);
    doc.text('RESUMO GERAL DO INVENTÁRIO', 14, 20);
    
    doc.setDrawColor(199, 196, 216);
    doc.line(14, 23, 196, 23);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(27, 27, 36);
    doc.text(`Valor Total Estimado em Estoque (Preço de Compra): ${totalValorEstoque.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, 14, 30);
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(53, 37, 205);
    doc.text('RESUMO GERAL DO INVENTÁRIO', 14, finalY + 10);
    
    doc.setDrawColor(199, 196, 216);
    doc.line(14, finalY + 13, 196, finalY + 13);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(27, 27, 36);
    doc.text(`Valor Total Estimado em Estoque (Preço de Compra): ${totalValorEstoque.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, 14, finalY + 20);
  }

  // Baixa o arquivo PDF
  doc.save(`relatorio-estoque-${new Date().toISOString().slice(0, 10)}.pdf`);
};

export const exportarMovimentacoesPDF = (movimentacoes: Movimentacao[]) => {
  const doc = new jsPDF({
    orientation: 'landscape', // Layout paisagem acomoda melhor as colunas de movimentações
    unit: 'mm',
    format: 'a4',
  });

  // Banner superior com a cor da marca
  doc.setFillColor(53, 37, 205); // Brand color #3525cd
  doc.rect(0, 0, 297, 35, 'F');

  // Título
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('GESTOR - CONTROLE DE ESTOQUE', 14, 15);

  // Subtítulo
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text('Relatório Histórico de Movimentações', 14, 23);

  // Metadados (Canto direito do cabeçalho)
  doc.setFontSize(9);
  const dataGeracao = new Date().toLocaleString('pt-BR');
  doc.text(`Gerado em: ${dataGeracao}`, 230, 15);
  doc.text(`Total Registros: ${movimentacoes.length}`, 230, 21);
  const totalEntradas = movimentacoes.filter(m => m.tipo === 'entrada').length;
  const totalSaidas = movimentacoes.filter(m => m.tipo === 'saida').length;
  doc.text(`Entradas / Saídas: ${totalEntradas} / ${totalSaidas}`, 230, 27);

  // Colunas e linhas
  const headers = ['Lote', 'Data/Hora', 'Tipo', 'Produto', 'Qtd', 'Conferente', 'Operação/Cliente', 'Vlr Unit', 'Total', 'Lucro'];
  
  const rows = movimentacoes.map((m) => [
    m.lote,
    `${m.data} ${m.horario}`,
    m.tipo.toUpperCase() === 'ENTRADA' ? 'ENTRADA' : 'SAÍDA',
    m.produtoNome,
    `${m.quantidade} un`,
    m.conferente,
    m.operacao,
    m.valorTotal && m.quantidade ? (m.valorTotal / m.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-',
    m.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    m.tipo === 'saida' ? m.lucro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-',
  ]);

  // Cálculos consolidados das movimentações
  const valorTotalMov = movimentacoes.reduce((acc, m) => acc + m.valorTotal, 0);
  const totalLucro = movimentacoes.filter(m => m.tipo === 'saida').reduce((acc, m) => acc + m.lucro, 0);

  // Gerar tabela autoTable
  autoTable(doc, {
    startY: 42,
    head: [headers],
    body: rows,
    theme: 'striped',
    headStyles: {
      fillColor: [53, 37, 205],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'left',
    },
    columnStyles: {
      0: { cellWidth: 22 }, // Lote
      1: { cellWidth: 28 }, // Data/Hora
      2: { cellWidth: 18 }, // Tipo
      4: { halign: 'right', cellWidth: 15 }, // Qtd
      7: { halign: 'right' }, // Vlr Unit
      8: { halign: 'right' }, // Total
      9: { halign: 'right' }, // Lucro
    },
    styles: {
      fontSize: 8,
      cellPadding: 2.5,
    },
    alternateRowStyles: {
      fillColor: [245, 242, 255], // Cor de destaque suave #f5f2ff
    },
    margin: { left: 14, right: 14 },
    didDrawPage: (data) => {
      // Rodapé
      const totalPages = doc.getNumberOfPages();
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(119, 117, 135);
      doc.text(
        `Gestão de Estoque - Relatório de Movimentações | Página ${data.pageNumber} de ${totalPages}`,
        14,
        doc.internal.pageSize.getHeight() - 10
      );
    },
  });

  // Adicionar resumo das movimentações ao final do documento
  const finalY = (doc as any).lastAutoTable.finalY || 45;
  const pageHeight = doc.internal.pageSize.getHeight();
  
  if (finalY + 30 > pageHeight) {
    doc.addPage();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(53, 37, 205);
    doc.text('RESUMO GERAL DAS MOVIMENTAÇÕES', 14, 20);
    
    doc.setDrawColor(199, 196, 216);
    doc.line(14, 23, 283, 23);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(27, 27, 36);
    doc.text(`Valor Total Geral de Saídas/Expedições: ${valorTotalMov.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, 14, 30);
    doc.text(`Lucro Bruto Estimado Geral: ${totalLucro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, 14, 36);
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(53, 37, 205);
    doc.text('RESUMO GERAL DAS MOVIMENTAÇÕES', 14, finalY + 10);
    
    doc.setDrawColor(199, 196, 216);
    doc.line(14, finalY + 13, 283, finalY + 13);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(27, 27, 36);
    doc.text(`Valor Total Geral de Saídas/Expedições: ${valorTotalMov.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, 14, finalY + 20);
    doc.text(`Lucro Bruto Estimado Geral: ${totalLucro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, 14, finalY + 26);
  }

  // Baixa o arquivo PDF
  doc.save(`relatorio-movimentacoes-${new Date().toISOString().slice(0, 10)}.pdf`);
};
