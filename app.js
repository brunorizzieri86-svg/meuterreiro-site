const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const screenData = {
  home: {desktop:'desktop-home', mobile:'mobile-home', title:'Comece o dia com uma visão da casa.', copy:'Avisos importantes, pendências e ações rápidas ajudam você a encontrar o próximo passo sem procurar em vários lugares.', desktopAlt:'Tela inicial do Meu Terreiro no computador', mobileAlt:'Tela inicial do Meu Terreiro no celular', number:'01 / 04'},
  finance: {desktop:'desktop-agenda', mobile:'mobile-finance', title:'Compromissos e contas, bem acompanhados.', copy:'No notebook, a agenda organiza os compromissos. No celular, o financeiro apresenta entradas, saídas, resultados e relatórios em PDF. Duas partes da rotina, no mesmo aplicativo.', desktopAlt:'Agenda e calendário do Meu Terreiro no computador', mobileAlt:'Financeiro do Meu Terreiro no celular, com receitas e despesas', number:'02 / 04'},
  people: {desktop:'desktop-home', mobile:'mobile-people', title:'Pessoas em primeiro lugar. Informações por perto.', copy:'Da visão geral da casa à ficha de cada pessoa: consulte funções, contatos, situação e aniversários. Os atalhos para WhatsApp ajudam a manter a proximidade.', desktopAlt:'Visão geral da administração da casa no computador', mobileAlt:'Lista de pessoas do Meu Terreiro no celular', number:'03 / 04'},
  stock: {desktop:'desktop-stock', mobile:'mobile-suppliers', title:'O que falta. Quem fornece. Tudo mais organizado.', copy:'Acompanhe itens baixos e críticos no estoque e encontre os fornecedores para pedir cotações. Um apoio para preparar a casa antes da próxima atividade.', desktopAlt:'Controle de estoque e compras no computador', mobileAlt:'Lista de fornecedores do Meu Terreiro no celular', number:'04 / 04'}
};
function setScreen(key) {
  const item = screenData[key]; if (!item) return;
  $$('.screen-tabs [role=tab]').forEach(b => {b.setAttribute('aria-selected', String(b.dataset.screen === key)); b.tabIndex = b.dataset.screen === key ? 0 : -1;});
  $('#screen-panel').setAttribute('aria-labelledby', 'tab-' + key);
  $('#desktop-screen').src = 'assets/' + item.desktop + '.webp'; $('#desktop-screen').alt = item.desktopAlt;
  $('#mobile-screen').src = 'assets/' + item.mobile + '.webp'; $('#mobile-screen').alt = item.mobileAlt;
  $('#screen-title').textContent = item.title; $('#screen-copy').textContent = item.copy; $('#screen-number').textContent = item.number;
}
$$('[data-screen]').forEach(b => b.addEventListener('click', () => setScreen(b.dataset.screen)));
$$('[data-select]').forEach(a => a.addEventListener('click', () => setScreen(a.dataset.select)));
const roles = {
  admin: {kicker:'QUEM CONDUZ A CASA', title:'Você organiza.\nA casa acompanha.', copy:'Administre a casa, envie convites e aprove os acessos. Defina o que cada pessoa pode consultar ou fazer.', items:['Gestão da casa e controle das permissões','Agenda, avisos e orientações para a comunidade','Validação de comprovantes de mensalidade']},
  filhos: {kicker:'QUEM FAZ PARTE DA CORRENTE', title:'A rotina da casa,\nmais perto de você.', copy:'Cada filho tem seu próprio acesso para acompanhar o que a casa compartilha e manter os dados pessoais atualizados.', items:['Agenda, calendário e avisos da casa','Consulta da mensalidade e envio de comprovante','Próprio cadastro e áreas liberadas pelo Pai/Mãe']},
  cambonos: {kicker:'QUEM APOIA O CUIDADO', title:'Apoio com informação.\nEquipe com direção.', copy:'Acompanhe a agenda e os materiais dos trabalhos. O responsável pode liberar áreas e ações de acordo com a função de cada pessoa.', items:['Compromissos, materiais e avisos','Mensalidade e próprio cadastro','Ações de apoio conforme as permissões concedidas']},
  consulentes: {kicker:'QUEM CHEGA PARA SER ACOLHIDO', title:'Informação para chegar.\nOrientação para seguir.', copy:'Um acesso dedicado para consultar giras abertas e receber as orientações enviadas individualmente pela casa.', items:['Datas, horários e locais das giras abertas','Orientações e banhos enviados para você','Avisos e informações do próprio cadastro']}
};
// Keep all profile descriptions in the same grid cell so the largest one
// reserves space. Switching tabs changes visibility, never the layout.
const rolePanel = $('#role-panel');
const roleLayers = Object.fromEntries(Object.entries(roles).map(([key, r]) => {
  const layer = document.createElement('div');
  layer.className = 'role-content' + (key === 'admin' ? ' is-active' : '');
  layer.setAttribute('aria-hidden', String(key !== 'admin'));
  const kicker = document.createElement('span'); kicker.textContent = r.kicker;
  const title = document.createElement('h3');
  title.replaceChildren(...r.title.split('\n').flatMap((line, i) => i ? [document.createElement('br'), document.createTextNode(line)] : [document.createTextNode(line)]));
  const copy = document.createElement('p'); copy.textContent = r.copy;
  const list = document.createElement('ul');
  list.replaceChildren(...r.items.map(text => {const li = document.createElement('li'); li.textContent = text; return li;}));
  layer.append(kicker, title, copy, list);
  return [key, layer];
}));
rolePanel.replaceChildren(...Object.values(roleLayers));
$$('[data-role]').forEach(b => b.addEventListener('click', () => {
  const key = b.dataset.role;
  $$('[data-role]').forEach(t => {t.setAttribute('aria-selected', String(t === b)); t.tabIndex = t === b ? 0 : -1;});
  rolePanel.setAttribute('aria-labelledby', 'role-' + key);
  Object.entries(roleLayers).forEach(([name, layer]) => {
    const active = name === key;
    layer.classList.toggle('is-active', active);
    layer.setAttribute('aria-hidden', String(!active));
  });
}));
const menu=$('.menu-toggle');menu.addEventListener('click',()=>{const on=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(on));$('#nav').classList.toggle('open',on);menu.setAttribute('aria-label',on?'Fechar menu':'Abrir menu');});
$$('#nav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');$('#nav').classList.remove('open');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');$('#nav').classList.remove('open');}});
const install=$('#install-dialog');$$('[data-install]').forEach(b=>b.addEventListener('click',()=>install.showModal()));$('[data-close]').addEventListener('click',()=>install.close());
const installation={android:['Abra o Meu Terreiro App no Chrome.','Toque em “Instalar app”, quando essa opção aparecer, ou abra o menu ⋮ do navegador.','Escolha “Instalar aplicativo” ou “Adicionar à tela inicial” e confirme.'],iphone:['Abra o Meu Terreiro App no Safari.','Toque em Compartilhar (o quadrado com a seta para cima).','Escolha “Adicionar à Tela de Início” e confirme em “Adicionar”.'],desktop:['Abra o Meu Terreiro App no Chrome ou no Edge.','Procure o ícone de instalação na barra de endereços ou a opção de instalar no menu do navegador.','Confirme a instalação. O aplicativo ficará disponível como um atalho no computador.']};
$$('[data-os]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.os;$$('[data-os]').forEach(t=>{t.setAttribute('aria-selected',String(t===b));t.tabIndex=t===b?0:-1;});$('#install-panel').setAttribute('aria-labelledby','os-'+key);$('#install-steps').replaceChildren(...installation[key].map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));}));
const imageDialog=$('#image-dialog');$$('[data-expand]').forEach(b=>b.addEventListener('click',()=>{const source=$('#'+b.dataset.expand+'-screen');$('#enlarged-screen').src=source.src;$('#enlarged-screen').alt=source.alt;$('#image-caption').textContent=source.alt;imageDialog.showModal();}));$('[data-image-close]').addEventListener('click',()=>imageDialog.close());
[install,imageDialog].forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}}));
$$('[role=tablist]').forEach(list=>list.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End','ArrowDown','ArrowUp'].includes(e.key))return;const tabs=$$('[role=tab]',list),i=tabs.indexOf(document.activeElement);if(i<0)return;e.preventDefault();let n=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1)+tabs.length)%tabs.length;tabs[n].focus();tabs[n].click();}));
$$('[data-whatsapp]').forEach(a=>a.href='https://wa.me/5511953525141?text='+encodeURIComponent(a.dataset.whatsapp));
$('#year').textContent=new Date().getFullYear();
