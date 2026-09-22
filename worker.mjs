const SYSTEM = `You are VAPE.AI, an assistant for founders, entrepreneurship, and product building. Help validate ideas, define customers, scope MVPs, draft code, and plan work. Be practical and concise. Ask focused questions when needed. Separate assumptions from evidence. Never fabricate research or completed actions. This prototype has no app connections, browsing, code execution, or deployment tools. Explain these limits when asked to take actions. Never claim to have performed an external action.`;
const counts = new Map();
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowed = new Set(['https://nandhakishore-7a-vape-ai.static.hf.space']);
    const headers = {'Content-Type':'application/json', 'Cache-Control':'no-store', 'Vary':'Origin'};
    if (allowed.has(origin)) headers['Access-Control-Allow-Origin'] = origin;
    const reply = (data, status=200) => Response.json(data, {status, headers});
    if (request.method === 'GET') return reply({name:'VAPE.AI', stage:'Founder chat prototype', automation:false});
    if (!allowed.has(origin)) return reply({error:'Please use the VAPE.AI website.'},403);
    if (request.method === 'OPTIONS') return new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}});
    if (request.method !== 'POST') return reply({error:'Method not allowed'},405);
    if (!request.headers.get('Content-Type')?.startsWith('application/json')) return reply({error:'JSON required'},415);
    const reader = request.body?.getReader();
    if (!reader) return reply({error:'Message required'},400);
    const chunks=[]; let size=0;
    while(true) { const {value,done}=await reader.read(); if(done) break; size+=value.byteLength; if(size>24000) {await reader.cancel();return reply({error:'Please shorten your conversation.'},413);} chunks.push(value); }
    let input; try { const bytes=new Uint8Array(size);let pos=0;for(const chunk of chunks){bytes.set(chunk,pos);pos+=chunk.length;} input=JSON.parse(new TextDecoder().decode(bytes)); } catch {return reply({error:'Invalid request'},400);}
    if (!Array.isArray(input.messages) || !input.messages.length || input.messages.length>9 || input.messages.some(m=>!m || !['user','assistant'].includes(m.role) || typeof m.content!=='string' || !m.content.trim() || m.content.length>4000) || input.messages.at(-1).role!=='user') return reply({error:'Send a message of up to 4,000 characters.'},400);
    const now=Date.now(), ip=request.headers.get('CF-Connecting-IP') || 'unknown';
    if(counts.size>5000) counts.clear();
    const record=counts.get(ip); const entry=record && now-record.start<60000 ? record : {start:now,n:0};
    if(entry.n>=5) return reply({error:'Please wait a minute before sending more messages.'},429);
    entry.n++;counts.set(ip,entry);
    try {
      const result=await env.AI.run('@cf/qwen/qwen2.5-coder-32b-instruct',{messages:[{role:'system',content:SYSTEM},...input.messages],max_tokens:650});
      if(typeof result.response!=='string' || !result.response.trim()) throw new Error('Empty result');
      return reply({answer:result.response});
    } catch {return reply({error:'AI is unavailable or the shared free allowance is exhausted. Please try again later.'},503);}
  }
};
