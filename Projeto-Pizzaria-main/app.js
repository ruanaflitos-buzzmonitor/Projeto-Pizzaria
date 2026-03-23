/* ═══════════════════════════════════════════════════════════════
   ⚙️  CONFIGURAÇÕES — edite somente este bloco
═══════════════════════════════════════════════════════════════ */
const CONFIG = {
  // Dentro do CONFIG (único lugar para editar)
  taxasBairros: {
    'Barra'         :  5.00,
    'Barra Avenida' :  5.00,
    'Canela'        :  6.00,
    'Campo Grande'  :  7.00,
    'Graça'         :  7.00,
    'Pituba'        :  8.00,
    'Federação'     :  8.00,
    'Rio Vermelho'  :  9.00,
    'Ondina'        :  9.00,
    'Itaigara'      : 10.00,
    'Stiep'         : 10.00,
    'Imbuí'         : 12.00,
    'Patamares'     : 14.00,
    'Piatã'         : 15.00,
    'Stella Maris'  : 16.00,
  },
  // WhatsApp do estabelecimento (código país + DDD + número, sem espaços ou símbolos)
  whatsapp: '5571993124222',

  // Chave Pix
  pix: '71999999999',
  pixTipo: 'Telefone', 
  linkCartaoDebito:  'https://mpago.la/seu-link-debito-aqui',
  linkCartaoCredito: 'https://mpago.la/seu-link-credito-aqui',

  nomeEstabelecimento: 'Pizzaria Express',

  

  // ─── ENDEREÇO DO ESTABELECIMENTO ─────────────────────────────
  // Cole aqui o endereço exato da pizzaria (usado para calcular a distância)
  enderecoEstabelecimento: 'Rua São Cristóvão, 2, Liberdade, Salvador, BA, Brasil',

  // ─── GOOGLE MAPS API KEY ──────────────────────────────────────
  // 1. Acesse console.cloud.google.com
  // 2. Crie um projeto → Ative "Maps JavaScript API" e "Distance Matrix API"
  // 3. Gere uma chave de API e cole abaixo
  // Sem a chave o site usa cálculo automático via OpenStreetMap (fallback gratuito)
  googleMapsKey: 'AIzaSyBYScNnxK57_TC21j4pK3KCDW_iimWzLCw',

  // Horário de funcionamento (para status automático do pedido)
  funcionamento: { abertura: 18, fechamento: 23, fechamentoMin: 30 },
};

// Popula o select com os bairros do CONFIG
function preencherBairros() {
  const sel = document.getElementById('f-bairro');
  if (!sel) return;
  sel.innerHTML = '<option value="">Selecione o bairro...</option>';
  Object.keys(CONFIG.taxasBairros).forEach(b => {
    const o = document.createElement('option');
    o.value = b;
    o.textContent = b;
    sel.appendChild(o);
  });
}

// Atualiza a taxa ao selecionar o bairro
function calcularTaxa() {
  const bairro = document.getElementById('f-bairro').value;
  const texto  = document.getElementById('taxa-texto');
  const valor  = document.getElementById('taxa-valor');

  if (!bairro) {
    taxaAtual = 0;
    texto.textContent = 'Selecione o bairro';
    valor.textContent = '—';
    atualizarResumo();
    return;
  }

  taxaAtual = CONFIG.taxasBairros[bairro] ?? 0;
  texto.textContent = bairro;
  valor.textContent = taxaAtual === 0 ? 'Grátis' : brl(taxaAtual);
  atualizarResumo();
}

// Atualiza a exibição ao trocar o método de entrega
function atualizarMetodo() {
  const m = document.getElementById('f-metodo').value;
  document.getElementById('bloco-endereco').style.display = m === 'delivery' ? 'block' : 'none';
  document.getElementById('bloco-retirada').style.display = m === 'retirada' ? 'block' : 'none';
  taxaAtual = 0;
  if (m === 'delivery') calcularTaxa();
  else atualizarResumo();
}
/* ═══════════════════════════════════════════════════════════════ */

/* ─── CARDÁPIO ─────────────────────────────────────────────────
   Para adicionar um item: copie um bloco { } e ajuste os campos.
   Para remover: delete o bloco inteiro.
   Campos:
     id    — número único (não repita)
     nome  — nome exibido no card e no pedido
     desc  — descrição curta
     preco — valor em reais (use ponto como decimal)
     tag   — etiqueta exibida no topo do card
     img   — URL da foto (pode usar links do Unsplash ou suas próprias fotos)
═══════════════════════════════════════════════════════════════ */
const PIZZAS = [
  {
    id: 1, nome: 'Calabresa',
    desc: 'Mussarela, calabresa fatiada e cebola roxa marinada',
    preco: 35.00, tag: 'Clássica',
    img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600'
  },
  {
    id: 2, nome: 'Margherita',
    desc: 'Tomate pelado, mussarela de búfala e manjericão fresco',
    preco: 32.00, tag: 'Italiana',
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600'
  },
  {
    id: 3, nome: 'Frango c/ Catupiry',
    desc: 'Frango desfiado temperado com catupiry cremoso',
    preco: 38.00, tag: 'Especial',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600'
  },
  {
    id: 4, nome: 'Portuguesa',
    desc: 'Presunto, ovos, cebola, azeitona e pimentão',
    preco: 40.00, tag: 'Tradicional',
    img: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600'
  },
  {
    id: 5, nome: 'Quatro Queijos',
    desc: 'Mussarela, parmesão, provolone e gorgonzola',
    preco: 42.00, tag: 'Premium',
    img: 'https://images.unsplash.com/photo-1548365328-9f547fb0953c?w=600'
  },
  {
    id: 6, nome: 'Pepperoni',
    desc: 'Mussarela abundante e pepperoni importado',
    preco: 44.00, tag: 'Premium',
    img: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=600'
  },
];

/* ══════════════════════════════════════════════════════════════
   A PARTIR DAQUI NÃO É NECESSÁRIO EDITAR
══════════════════════════════════════════════════════════════ */

let cart = {};
let taxaAtual = 0;

// ─── Utilitários ───────────────────────────────────────────────

function brl(v) {
  return 'R$ ' + v.toFixed(2).replace('.', ',');
}

function gerarIdPedido() {
  const ts  = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `PED-${ts}-${rnd}`;
}

function statusPedido() {
  const { abertura, fechamento, fechamentoMin } = CONFIG.funcionamento;
  const agora = new Date();
  const hhmm  = agora.getHours() * 60 + agora.getMinutes();
  const abre  = abertura * 60;
  const fecha = fechamento * 60 + fechamentoMin;
  return (hhmm >= abre && hhmm <= fecha)
    ? '🟢 Feito durante o horário de funcionamento'
    : '🕐 Fora do horário — será confirmado ao abrirmos';
}

function formatarTelefone(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 11);
  if      (v.length >= 11) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  else if (v.length >= 7)  v = v.replace(/(\d{2})(\d{4,5})(\d{0,4})/, '($1) $2-$3');
  else if (v.length >= 3)  v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  input.value = v;
}

function limparErro(id) {
  document.getElementById(id)?.classList.remove('has-error');
}

// ─── Taxa por distância ────────────────────────────────────────

function taxaPorKm(km) {
  for (const faixa of CONFIG.tabelaDistancia) {
    if (km <= faixa.ate_km) return faixa.taxa;
  }
  return null;
}

let _distTimer = null;
function onEnderecoInput() {
  clearTimeout(_distTimer);
  setTaxaStatus('digitando');
  _distTimer = setTimeout(calcularDistancia, 900);
}

function setTaxaStatus(estado, dados) {
  const loading = document.getElementById('taxa-loading');
  const dist    = document.getElementById('taxa-dist');
  const texto   = document.getElementById('taxa-texto');
  const valor   = document.getElementById('taxa-valor');

  loading.style.display = 'none';
  dist.style.display    = 'none';

  if (estado === 'digitando') {
    texto.textContent = 'Aguardando endereço...';
    valor.textContent = '—';
    taxaAtual = 0;
  } else if (estado === 'calculando') {
    loading.style.display = 'block';
    texto.textContent = 'Calculando...';
    valor.textContent = '—';
    taxaAtual = 0;
  } else if (estado === 'ok') {
    const { km, taxa, endFormatado } = dados;
    texto.textContent = endFormatado || 'Endereço encontrado';
    valor.textContent = brl(taxa);
    dist.style.display = 'block';
    document.getElementById('taxa-dist-txt').textContent = `${km.toFixed(1)} km de distância`;
    taxaAtual = taxa;
  } else if (estado === 'fora') {
    texto.textContent = '⚠️ Fora da área de entrega';
    valor.textContent = '—';
    taxaAtual = 0;
  } else if (estado === 'erro') {
    texto.textContent = 'Não foi possível calcular — verifique o endereço';
    valor.textContent = '—';
    taxaAtual = 0;
  } else if (estado === 'vazio') {
    texto.textContent = 'Digite o endereço acima';
    valor.textContent = '—';
    taxaAtual = 0;
  }
  atualizarResumo();
}

async function calcularDistancia() {
  const end = document.getElementById('f-end').value.trim();
  if (end.length < 8) { setTaxaStatus('vazio'); return; }

  if (!CONFIG.googleMapsKey || CONFIG.googleMapsKey === 'SUA_CHAVE_AQUI') {
    await calcularDistanciaFallback(end);
    return;
  }

  setTaxaStatus('calculando');

  const origem  = encodeURIComponent(CONFIG.enderecoEstabelecimento);
  const destino = encodeURIComponent(end + ', Salvador, BA, Brasil');
  const key     = CONFIG.googleMapsKey;

  try {
    const url  = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origem}&destinations=${destino}&mode=driving&language=pt-BR&key=${key}`;
    const res  = await fetch(url);
    const data = await res.json();

    if (data.status !== 'OK') throw new Error(data.status);

    const element = data.rows[0].elements[0];
    if (element.status !== 'OK') throw new Error(element.status);

    const km          = element.distance.value / 1000;
    const taxa        = taxaPorKm(km);
    const endFormatado = data.destination_addresses[0];

    taxa === null ? setTaxaStatus('fora') : setTaxaStatus('ok', { km, taxa, endFormatado });

  } catch (e) {
    console.warn('Distance Matrix falhou, usando fallback:', e);
    await calcularDistanciaFallback(end);
  }
}

async function calcularDistanciaFallback(enderecoCliente) {
  setTaxaStatus('calculando');

  try {
    const enc = (addr) =>
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addr)}&format=json&limit=1`;

    const [resEst, resCli] = await Promise.all([
      fetch(enc(CONFIG.enderecoEstabelecimento), { headers: { 'Accept-Language': 'pt-BR' } }),
      fetch(enc(enderecoCliente + ', Salvador, BA, Brasil'), { headers: { 'Accept-Language': 'pt-BR' } }),
    ]);

    const [dadosEst, dadosCli] = await Promise.all([resEst.json(), resCli.json()]);

    if (!dadosEst[0] || !dadosCli[0]) throw new Error('Endereço não encontrado');

    const lat1 = parseFloat(dadosEst[0].lat), lon1 = parseFloat(dadosEst[0].lon);
    const lat2 = parseFloat(dadosCli[0].lat), lon2 = parseFloat(dadosCli[0].lon);

    const R    = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a    = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
    const kmLinha    = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const kmEstimado = kmLinha * 1.4;
    const taxa       = taxaPorKm(kmEstimado);
    const endFormatado = dadosCli[0].display_name.split(',').slice(0, 3).join(',');

    taxa === null ? setTaxaStatus('fora') : setTaxaStatus('ok', { km: kmEstimado, taxa, endFormatado });

  } catch (e) {
    console.error('Fallback também falhou:', e);
    setTaxaStatus('erro');
  }
}

// ─── Método de entrega ─────────────────────────────────────────

function atualizarMetodo() {
  const m = document.getElementById('f-metodo').value;
  document.getElementById('bloco-endereco').style.display = m === 'delivery' ? 'block' : 'none';
  document.getElementById('bloco-retirada').style.display = m === 'retirada' ? 'block' : 'none';
  if (m === 'retirada') { taxaAtual = 0; atualizarResumo(); }
  if (m === 'delivery') { setTaxaStatus('vazio'); }
}

// ─── Pagamento ─────────────────────────────────────────────────

function atualizarPagamento() {
  const pgto = document.getElementById('f-pgto').value;

  document.getElementById('fg-troco').style.display = pgto === 'dinheiro' ? 'block' : 'none';

  const pb = document.getElementById('pixBox');
  if (pgto === 'pix') {
    pb.classList.add('show');
    document.getElementById('pixKeyDisplay').textContent = CONFIG.pix + '  (' + CONFIG.pixTipo + ')';
  } else {
    pb.classList.remove('show');
  }

  const cb   = document.getElementById('cardBox');
  const link = pgto === 'debito'  ? CONFIG.linkCartaoDebito
             : pgto === 'credito' ? CONFIG.linkCartaoCredito
             : '';
  if (link) {
    cb.classList.add('show');
    document.getElementById('cardLinkDisplay').textContent = link;
  } else {
    cb.classList.remove('show');
  }
}

function copiarPix() {
  navigator.clipboard.writeText(CONFIG.pix).then(() => showToast('✓ Chave Pix copiada!'));
}

function copiarLinkCartao() {
  const pgto = document.getElementById('f-pgto').value;
  const link = pgto === 'debito' ? CONFIG.linkCartaoDebito : CONFIG.linkCartaoCredito;
  if (link) navigator.clipboard.writeText(link).then(() => showToast('✓ Link de pagamento copiado!'));
}

// ─── Resumo dinâmico ───────────────────────────────────────────

function atualizarResumo() {
  const items    = Object.values(cart);
  const subtotal = items.reduce((s, i) => s + i.preco * i.qty, 0);
  const metodo   = document.getElementById('f-metodo')?.value;
  const taxa     = metodo === 'delivery' ? taxaAtual : 0;
  const total    = subtotal + taxa;

  let html = items.map(i => {
    const nome = i.meio ? `½ ${i.meio[0].nome} + ½ ${i.meio[1].nome}` : i.nome;
    return `<div class="order-line"><span>${nome} ×${i.qty}</span><span>${brl(i.preco * i.qty)}</span></div>`;
  }).join('');

  html += `<div class="order-line separator"><span class="muted">Subtotal</span><span>${brl(subtotal)}</span></div>`;
  html += `<div class="order-line"><span class="muted">Taxa de entrega</span><span>${taxa === 0 ? 'Grátis' : brl(taxa)}</span></div>`;
  html += `<div class="order-line total-line"><span>Total</span><span>${brl(total)}</span></div>`;

  document.getElementById('orderSummary').innerHTML = html;
}

// ─── Telefones ─────────────────────────────────────────────────

function adicionarTelefone() {
  const list = document.getElementById('phoneList');
  const row  = document.createElement('div');
  row.className = 'phone-row';
  row.innerHTML = `
    <input type="tel" placeholder="(71) 99999-9999" oninput="formatarTelefone(this)">
    <button class="rm-phone-btn" onclick="this.parentElement.remove()" title="Remover">✕</button>`;
  list.appendChild(row);
}

function coletarTelefones() {
  return [...document.querySelectorAll('#phoneList input')]
    .map(i => i.value.trim()).filter(Boolean).join(' / ');
}

// ─── Validação ─────────────────────────────────────────────────

function validarFormulario() {
  let ok = true;
  const metodo = document.getElementById('f-metodo').value;

  const chk = (grupoId, valor) => {
    const g = document.getElementById(grupoId);
    if (!valor) { g.classList.add('has-error'); ok = false; }
    return !!valor;
  };

  chk('fg-nome', document.getElementById('f-nome').value.trim());

  const telOk = [...document.querySelectorAll('#phoneList input')].some(p => p.value.trim());
  if (!telOk) { document.getElementById('fg-tel').classList.add('has-error'); ok = false; }

  chk('fg-metodo', metodo);

  if (metodo === 'delivery') {
    chk('fg-end',    document.getElementById('f-end').value.trim());
    chk('fg-bairro', document.getElementById('f-bairro').value);
    const endOk = document.getElementById('f-end').value.trim();
    if (endOk && taxaAtual === 0) {
      showToast('⚠️ Aguarde o cálculo da taxa de entrega');
      ok = false;
    }
  }

  chk('fg-pgto', document.getElementById('f-pgto').value);

  if (!ok) showToast('⚠️ Preencha todos os campos obrigatórios');
  return ok;
}

// ─── Enviar WhatsApp ───────────────────────────────────────────

function enviarWhatsApp() {
  if (!validarFormulario()) return;

  const id     = gerarIdPedido();
  const agora  = new Date();
  const dtHora = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const status = statusPedido();

  const nome   = document.getElementById('f-nome').value.trim();
  const tels   = coletarTelefones();
  const metodo = document.getElementById('f-metodo').value;
  const pgto   = document.getElementById('f-pgto').value;
  const troco  = document.getElementById('f-troco').value.trim();
  const comp   = document.getElementById('f-comp')?.value.trim() || '';
  const bairro = document.getElementById('f-bairro').value;

  const items    = Object.values(cart);
  const subtotal = items.reduce((s, i) => s + i.preco * i.qty, 0);
  const taxa     = metodo === 'delivery' ? taxaAtual : 0;
  const total    = subtotal + taxa;

  const pgtoLabel = { dinheiro: '💵 Dinheiro', pix: '📱 Pix', debito: '💳 Débito', credito: '💳 Crédito' };

  let endTxt  = 'Retirada no balcão';
  let distTxt = '';
  if (metodo === 'delivery') {
    const end = document.getElementById('f-end').value.trim();
    endTxt = end + (comp ? ', ' + comp : '') + ' — ' + bairro;
    const distEl = document.getElementById('taxa-dist-txt');
    if (distEl && distEl.textContent) distTxt = `\nDistância: ${distEl.textContent}`;
  }

  const itensTxt = items.map(i => {
    if (i.meio) {
      return `  • Pizza Meio a Meio:\n      - ½ ${i.meio[0].nome}\n      - ½ ${i.meio[1].nome}\n      →  ${brl(i.preco)} ×${i.qty}  =  ${brl(i.preco * i.qty)}`;
    }
    return `  • ${i.nome} ×${i.qty}  →  ${brl(i.preco * i.qty)}`;
  }).join('\n');

  const pixTxt = pgto === 'pix'
    ? `\n📱 *Chave Pix (${CONFIG.pixTipo}):* ${CONFIG.pix}\n_Envie o comprovante nesta conversa._`
    : '';

  const linkDebito  = CONFIG.linkCartaoDebito  || '';
  const linkCredito = CONFIG.linkCartaoCredito || '';
  const cartaoTxt   =
      pgto === 'debito'  && linkDebito  ? `\n🔗 *Link de pagamento (Débito):*\n${linkDebito}\n_Acesse, pague e envie o comprovante aqui._`
    : pgto === 'credito' && linkCredito ? `\n🔗 *Link de pagamento (Crédito):*\n${linkCredito}\n_Acesse, pague e envie o comprovante aqui._`
    : '';

  const trocoTxt = pgto === 'dinheiro' && troco ? `\n💰 *Troco para:* ${troco}` : '';

  const msg =
`🍕 *${CONFIG.nomeEstabelecimento}* — Novo Pedido

🔖 *Pedido #${id}*
📅 ${dtHora}
📌 *Status:* ${status}

━━━━━━━━━━━━━━━━━━━━
👤 *CLIENTE*
━━━━━━━━━━━━━━━━━━━━
Nome:      ${nome}
Telefone:  ${tels}

━━━━━━━━━━━━━━━━━━━━
🚚 *ENTREGA*
━━━━━━━━━━━━━━━━━━━━
Método:    ${metodo === 'delivery' ? '🛵 Delivery' : '🏪 Retirada no balcão'}
Endereço:  ${endTxt}${distTxt}

━━━━━━━━━━━━━━━━━━━━
🍕 *ITENS DO PEDIDO*
━━━━━━━━━━━━━━━━━━━━
${itensTxt}

Subtotal:        ${brl(subtotal)}
Taxa de entrega: ${taxa === 0 ? 'Grátis' : brl(taxa)}
*TOTAL FINAL:    ${brl(total)}*

━━━━━━━━━━━━━━━━━━━━
💳 *PAGAMENTO*
━━━━━━━━━━━━━━━━━━━━
Forma: ${pgtoLabel[pgto] || pgto}${trocoTxt}${pixTxt}${cartaoTxt}

━━━━━━━━━━━━━━━━━━━━
_Pedido gerado via site._`;

  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  fecharModal();
  showToast('✓ Pedido enviado! Aguarde confirmação 🍕');
}

// Attach to checkout button
document.addEventListener('DOMContentLoaded', () => {
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', enviarWhatsApp);
  }
});

// ─── Cardápio ──────────────────────────────────────────────────

function renderMenu() {
  document.getElementById('menuGrid').innerHTML = PIZZAS.map(p => `
    <div class="card">
      <div class="card-img-wrap">
        <img class="card-img" src="${p.img}" alt="${p.nome}" loading="lazy">
      </div>
      <div class="card-body">
        <p class="card-tag">${p.tag}</p>
        <h3 class="card-name">${p.nome}</h3>
        <p class="card-desc">${p.desc}</p>
        <div class="card-footer">
          <span class="card-price">${brl(p.preco)}</span>
          <div style="display:flex;gap:8px;align-items:center;">
            <button class="half-btn" onclick="abrirModalMeio(${p.id})" title="Pizza meio a meio">½ Meio a Meio</button>
            <div class="qty-control" id="ctrl-${p.id}">
              <button class="add-btn" onclick="adicionarItem(${p.id})">+ Adicionar</button>
            </div>
          </div>
        </div>
      </div>
    </div>`).join('');
}

function updateCardControl(id) {
  const ctrl = document.getElementById(`ctrl-${id}`);
  if (!ctrl) return;
  const qty = cart[id]?.qty || 0;
  ctrl.innerHTML = qty === 0
    ? `<button class="add-btn" onclick="adicionarItem(${id})">+ Adicionar</button>`
    : `<button class="qty-btn" onclick="decrementarItem(${id})">−</button>
       <span class="qty-num">${qty}</span>
       <button class="qty-btn" onclick="adicionarItem(${id})">+</button>`;
}

// ─── Carrinho ──────────────────────────────────────────────────

function adicionarItem(id) {
  const pizza = PIZZAS.find(p => p.id === id);
  if (!pizza) return;
  cart[id] ? cart[id].qty++ : (cart[id] = { ...pizza, qty: 1 });
  updateCardControl(id);
  renderCart();
  bumpBadge();
  showToast(`✓ ${pizza.nome} adicionada`);
}

function incrementarItemCarrinho(id) {
  if (!cart[id]) return;
  cart[id].qty++;
  updateCardControl(id);
  renderCart();
  bumpBadge();
}

function decrementarItem(id) {
  if (!cart[id]) return;
  cart[id].qty--;
  if (cart[id].qty <= 0) delete cart[id];
  updateCardControl(id);
  renderCart();
  bumpBadge();
}

function removerItem(id) {
  delete cart[id];
  updateCardControl(id);
  renderCart();
  bumpBadge();
}

function limparCarrinho() {
  cart = {};
  PIZZAS.forEach(p => updateCardControl(p.id));
  renderCart();
  bumpBadge();
}

function renderCart() {
  const items    = Object.values(cart);
  const subtotal = items.reduce((s, i) => s + i.preco * i.qty, 0);
  const total    = items.reduce((s, i) => s + i.qty, 0);
  const btn      = document.getElementById('checkoutBtn');

  document.getElementById('totalValue').textContent = brl(subtotal);
  document.getElementById('cartBadge').textContent  = total;
  btn.disabled = items.length === 0;

  // FAB mobile
  const fab      = document.getElementById('cartFab');
  const fabBadge = document.getElementById('fabBadge');
  const fabLabel = document.getElementById('fabLabel');
  if (fab) {
    fabBadge.textContent = total;
    fabLabel.textContent = total > 0 ? `Ver carrinho · ${brl(subtotal)}` : 'Carrinho';
    fab.classList.toggle('hidden', total === 0);
  }

  if (items.length === 0) {
    document.getElementById('sidebarItems').innerHTML =
      `<div class="empty-msg">Seu carrinho está vazio.<br>Escolha uma pizza! 🍕</div>`;
    return;
  }

  document.getElementById('sidebarItems').innerHTML = items.map(item => {
    const nome  = item.meio
      ? `½ ${item.meio[0].nome} + ½ ${item.meio[1].nome}`
      : item.nome;
    const img   = item.meio ? item.meio[0].img : item.img;
    const badge = item.meio ? `<span class="cart-item-half-badge">Meio a Meio</span><br>` : '';
    return `
    <div class="cart-item">
      <img class="cart-item-img" src="${img}" alt="${nome}">
      <div class="cart-item-info">
        <p class="cart-item-name">${badge}${nome}</p>
        <p class="cart-item-price">${brl(item.preco)} × ${item.qty}</p>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="decrementarItem('${item.id}')" style="width:28px;height:28px;font-size:1rem;">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="incrementarItemCarrinho('${item.id}')" style="width:28px;height:28px;font-size:1rem;">+</button>
          <button class="remove-btn" onclick="removerItem('${item.id}')">✕ remover</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ─── Modal / Sidebar ───────────────────────────────────────────

function toggleCart() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('open');
}

function abrirModal() {
  toggleCart();
  preencherBairros(); // ← linha nova
  atualizarResumo();
  document.getElementById('modalOverlay').classList.add('open');
}

function fecharModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

// ─── Meio a Meio ───────────────────────────────────────────────

let halfSelecao = [null, null]; // [pizza1, pizza2]

function abrirModalMeio(idInicial) {
  halfSelecao = [null, null];
  // pré-seleciona o sabor do card clicado na primeira metade
  const pizza = PIZZAS.find(p => p.id === idInicial);
  if (pizza) halfSelecao[0] = pizza;
  renderHalfModal();
  document.getElementById('halfModalOverlay').classList.add('open');
}

function fecharModalMeio() {
  document.getElementById('halfModalOverlay').classList.remove('open');
}

function renderHalfModal() {
  // Slots
  ['slot-1', 'slot-2'].forEach((slotId, i) => {
    const slot = document.getElementById(slotId);
    const p    = halfSelecao[i];
    if (p) {
      slot.className = 'half-slot filled';
      slot.innerHTML = `
        <span class="half-slot-label">${i === 0 ? '1ª metade' : '2ª metade'}</span>
        <span class="half-slot-name">${p.nome}</span>
        <span class="half-slot-price">${brl(p.preco)}</span>
        <button class="half-slot-rm" onclick="removerHalf(${i})">✕ remover</button>`;
    } else {
      slot.className = 'half-slot';
      slot.innerHTML = `
        <span class="half-slot-label">${i === 0 ? '1ª metade' : '2ª metade'}</span>
        <span class="half-slot-empty">Selecione abaixo</span>`;
    }
  });

  // Preview de preço — cobra o maior dos dois sabores
  const p1 = halfSelecao[0], p2 = halfSelecao[1];
  const preco = (p1 && p2) ? Math.max(p1.preco, p2.preco) : null;
  document.getElementById('halfPriceVal').textContent = preco ? brl(preco) : '—';

  // Botão confirmar
  document.getElementById('halfConfirmBtn').disabled = !(p1 && p2);

  // Lista de sabores — qual slot está sendo preenchido (primeiro vazio)
  const slotAlvo = halfSelecao[0] === null ? 0 : halfSelecao[1] === null ? 1 : null;

  const grid = document.getElementById('halfSelectGrid');
  grid.innerHTML = PIZZAS.map(p => {
    const selecionado0 = halfSelecao[0]?.id === p.id;
    const selecionado1 = halfSelecao[1]?.id === p.id;
    const selecionado  = selecionado0 || selecionado1;
    // Desabilita se já está nos dois slots ou se não há slot disponível
    const desabilitado = slotAlvo === null && !selecionado;
    return `
      <div class="half-option ${selecionado ? 'selected' : ''} ${desabilitado ? 'disabled' : ''}"
           onclick="selecionarHalf(${p.id})">
        <img class="half-option-img" src="${p.img}" alt="${p.nome}">
        <div class="half-option-info">
          <p class="half-option-name">${p.nome}</p>
          <p class="half-option-price">${brl(p.preco)}</p>
        </div>
        <div class="half-option-dot"></div>
      </div>`;
  }).join('');
}

function selecionarHalf(id) {
  const pizza = PIZZAS.find(p => p.id === id);
  if (!pizza) return;

  // Se já está selecionado em algum slot, remove
  if (halfSelecao[0]?.id === id) { halfSelecao[0] = null; renderHalfModal(); return; }
  if (halfSelecao[1]?.id === id) { halfSelecao[1] = null; renderHalfModal(); return; }

  // Preenche o próximo slot vazio
  if (halfSelecao[0] === null)      halfSelecao[0] = pizza;
  else if (halfSelecao[1] === null) halfSelecao[1] = pizza;

  renderHalfModal();
}

function removerHalf(i) {
  halfSelecao[i] = null;
  renderHalfModal();
}

function confirmarMeioAMeio() {
  const [p1, p2] = halfSelecao;
  if (!p1 || !p2) return;

  // Preço = maior dos dois sabores
  const preco = Math.max(p1.preco, p2.preco);

  // ID único para o item meio a meio no carrinho
  const cartId = `meio_${Math.min(p1.id, p2.id)}_${Math.max(p1.id, p2.id)}`;

  if (cart[cartId]) {
    cart[cartId].qty++;
  } else {
    cart[cartId] = {
      id: cartId,
      nome: `½ ${p1.nome} + ½ ${p2.nome}`,
      preco,
      qty: 1,
      meio: [p1, p2],
      img: p1.img,
    };
  }

  renderCart();
  bumpBadge();
  fecharModalMeio();
  showToast(`✓ Pizza meio a meio adicionada!`);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) fecharModal();
  });

  document.getElementById('halfModalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('halfModalOverlay')) fecharModalMeio();
  });

  renderMenu();
  renderCart();
});

// ─── Animações / UI ────────────────────────────────────────────

function bumpBadge() {
  const badge = document.getElementById('cartBadge');
  badge.classList.remove('bump');
  void badge.offsetWidth;
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 400);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}
