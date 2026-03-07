import { useState } from "react";

// ── DESIGN TOKENS ─────────────────────────────────────────────
const C = {
  white: "#FFFFFF", paper: "#FAFAF9", warm: "#F5F2EE",
  hairline: "#E8E4DF", muted: "#C4BDB5", slate: "#8A8078",
  ink: "#1A1714", softInk: "#3A3530", mid: "#6A6058",
  accent: "#A0785A", accentLight: "#F7F2EE",
  gold: "#9A7840", goldLight: "#F8F4EE",
  agentInk: "#1A2A1A", agentAccent: "#3A5A3A", agentLight: "#F2F6F2",
  bloggerInk: "#1A1A2A", bloggerAccent: "#4A4A8A", bloggerLight: "#F2F2FA",
};

const FONT = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
};

// ── REAL BLOGGERS ─────────────────────────────────────────────
const BLOGGERS = {
  lottieanddoof: {
    id: "lottieanddoof",
    name: "Lottie + Doof",
    handle: "@lottieanddoof",
    desc: "Chicago-based food writer. One of the city's most trusted voices since 2006.",
    url: "https://www.lottieanddoof.com/chicagoguide/",
    followers: "7.9K",
  },
  "312food": {
    id: "312food",
    name: "312food",
    handle: "@312food",
    desc: "Erin Byrne's Chicago restaurant and city guide. 100K+ followers. Princeton neuroscientist turned local food authority.",
    url: "https://www.312food.com/",
    followers: "100K+",
  },
  chicagofoodauthority: {
    id: "chicagofoodauthority",
    name: "Chicago Food Authority",
    handle: "@chicagofoodauthority",
    desc: "Chicago's premier food and culture guide. 285K followers. Securing Chicago as the top food destination.",
    url: "https://www.chicagofoodauthority.com/",
    followers: "285K",
  },
  chicagofoodiesisters: {
    id: "chicagofoodiesisters",
    name: "Chicago Foodie Sisters",
    handle: "@chicagofoodiesisters",
    desc: "Award-winning food and travel writers covering Chicago's best eats.",
    url: "https://chicagofoodiesisters.blogspot.com/",
    followers: "6K",
  },
};

// ── DATA ──────────────────────────────────────────────────────
const BADGE_TIERS = [
  { id: "contributor",  label: "Contributor",         min: 5,   color: C.slate },
  { id: "trusted",      label: "Trusted Contributor", min: 25,  color: C.mid   },
  { id: "cityvoice",    label: "City Voice",          min: 75,  color: C.accent},
  { id: "innercircle",  label: "Inner Circle",        min: 150, color: C.ink   },
];

const TRAVEL_STYLES = [
  { id: "conference", label: "Conference & work travel", icon: "🏛" },
  { id: "relocation", label: "Relocation",               icon: "🏠" },
  { id: "leisure",    label: "Leisure & holidays",       icon: "✈️" },
  { id: "family",     label: "Family trips",             icon: "👨‍👩‍👧" },
  { id: "slow",       label: "Slow travel",              icon: "🌿" },
  { id: "weekend",    label: "Weekend escapes",          icon: "🌅" },
];

const WORLD_CATEGORIES = [
  { id: "healthcare", label: "Healthcare & Life Sciences", icon: "🩺" },
  { id: "education",  label: "Education & Academia",       icon: "🎓" },
  { id: "realestate", label: "Real Estate & Property",     icon: "🏠" },
  { id: "legal",      label: "Legal & Professional Services", icon: "⚖️" },
  { id: "tech",       label: "Tech & Startups",            icon: "💻" },
  { id: "creative",   label: "Creative & Media",           icon: "🎨" },
  { id: "finance",    label: "Finance & Investment",       icon: "📊" },
  { id: "traveler",   label: "Just a great traveler",      icon: "🗺️" },
];

const AGENTS = [
  {
    id: "a1", name: "James Okafor", basedIn: "Chicago, IL",
    bio: "Real estate developer working across Chicago's north and west side neighborhoods for 14 years. I help clients relocating from the coasts understand what Chicago actually feels like to live in — not just the tourist version.",
    worldLabel: "Real Estate Developer", worlds: ["realestate"],
    travelStyles: ["relocation","leisure"], avatar: "JO",
    isAgent: true, agentSince: "2024", expertCities: ["Chicago"],
    totalPins: 34, totalCollections: 4, rating: 4.8, ratingCount: 23,
    specialties: ["North Side","West Loop","Logan Square","Family relocation"],
    lastActive: "3 days ago", communityTier: "innercircle",
  },
  {
    id: "a2", name: "Elena Vasquez", basedIn: "Miami, FL",
    bio: "Relocation specialist with 200+ families moved across Florida and the Southeast. I know what makes a neighborhood livable — good coffee within walking distance, a park nearby, a morning you'd want to repeat.",
    worldLabel: "Relocation Specialist", worlds: ["realestate"],
    travelStyles: ["relocation","family"], avatar: "EV",
    isAgent: true, agentSince: "2024", expertCities: ["Miami","Tampa"],
    totalPins: 28, totalCollections: 3, rating: 4.6, ratingCount: 18,
    specialties: ["Brickell","Coral Gables","Family relocation","International buyers"],
    lastActive: "1 week ago", communityTier: "cityvoice",
  },
];

const USERS = [
  { id:"u1", name:"David Kim",   worldLabel:"Cardiologist",     worlds:["healthcare"],            travelStyles:["conference"],          avatar:"DK", isAgent:false, totalPins:47, communityTier:"trusted",     connection:true  },
  { id:"u2", name:"Sarah Mehta", worldLabel:"Medical Educator", worlds:["healthcare","education"], travelStyles:["conference","family"], avatar:"SM", isAgent:false, totalPins:82, communityTier:"cityvoice",   connection:true  },
  { id:"u4", name:"Priya Nair",  worldLabel:"PhD Researcher",   worlds:["education"],             travelStyles:["conference","leisure"],avatar:"PN", isAgent:false, totalPins:19, communityTier:"contributor", connection:false },
];

const ALL = [...AGENTS, ...USERS];
const connectionIds = ["u1","u2"];

// Blogger endorsements attached to pins
// Each endorsement has: bloggerId, blurb (their words, paraphrased), postUrl
const PINS = [
  {
    id:1, name:"Avec", area:"West Loop", cat:"Restaurant", emoji:"🍷",
    travelStyles:["conference","leisure"],
    note:"Shared plates, no reservations before 6pm. The dates with bacon are not optional. Twelve minutes from McCormick Place.",
    by:"u1", saves:34, city:"Chicago",
    endorsements:[
      { bloggerId:"312food", blurb:"One of Erin's go-to West Loop picks — she calls it essential Chicago dining.", postUrl:"https://www.312food.com/" },
      { bloggerId:"chicagofoodauthority", blurb:"Ranked among Chicago Food Authority's most recommended West Loop restaurants.", postUrl:"https://www.chicagofoodauthority.com/" },
    ],
  },
  {
    id:2, name:"The 606 Trail", area:"Wicker Park", cat:"Outdoors", emoji:"🌿",
    travelStyles:["conference","leisure","family","relocation"],
    note:"Elevated rail trail — flat, safe, beautiful. A 45-minute run or a slow family walk. It tells you how Chicago actually lives.",
    by:"u2", saves:28, city:"Chicago",
    endorsements:[
      { bloggerId:"lottieanddoof", blurb:"Tim Mazurek's Chicago guide calls the 606 one of the great additions to the city — a trail that shows Chicago at its best.", postUrl:"https://www.lottieanddoof.com/chicagoguide/" },
    ],
  },
  {
    id:3, name:"Logan Square Farmers Market", area:"Logan Square", cat:"Market", emoji:"🥬",
    travelStyles:["relocation","leisure","family"],
    note:"Sunday mornings. If you are evaluating Logan Square, this is the thing to do. The neighborhood shows its best self between 9am and noon.",
    by:"a1", saves:41, city:"Chicago",
    endorsements:[
      { bloggerId:"312food", blurb:"312food covers Logan Square's market as a top Sunday destination — the city's friendliest neighbourhood at its best.", postUrl:"https://www.312food.com/" },
    ],
  },
  {
    id:4, name:"Publican Quality Meats", area:"West Loop", cat:"Café", emoji:"☕",
    travelStyles:["conference"],
    note:"Counter service, opens at 7am. Order the breakfast sandwich if you have a 9am session. Fourteen minutes from the venue.",
    by:"u4", saves:21, city:"Chicago",
    endorsements:[
      { bloggerId:"lottieanddoof", blurb:"Lottie + Doof names Publican Quality Meats a West Loop essential — part of the same group as Avec, and just as good.", postUrl:"https://www.lottieanddoof.com/chicagoguide/" },
    ],
  },
  {
    id:5, name:"Art Institute — Modern Wing", area:"Millennium Park", cat:"Culture", emoji:"🎨",
    travelStyles:["conference","leisure","family","relocation"],
    note:"The Renzo Piano wing alone is worth ninety minutes. Free with Illinois residency — worth knowing if you're considering the city.",
    by:"u2", saves:67, city:"Chicago",
    endorsements:[
      { bloggerId:"chicagofoodiesisters", blurb:"The Foodie Sisters call the Modern Wing a must on every Chicago visit — the architecture alone makes it worth the trip.", postUrl:"https://chicagofoodiesisters.blogspot.com/" },
      { bloggerId:"lottieanddoof", blurb:"Featured in Lottie + Doof's Chicago essentials — a world-class collection in a world-class building.", postUrl:"https://www.lottieanddoof.com/chicagoguide/" },
    ],
  },
  {
    id:6, name:"Wicker Park Walk", area:"Wicker Park", cat:"Neighborhood", emoji:"🏘",
    travelStyles:["relocation"],
    note:"Milwaukee Ave to Division St. The best two-hour relocation reconnaissance in Chicago. Coffee, bookshop, grocers, park. You'll know immediately if it's your neighbourhood.",
    by:"a1", saves:89, city:"Chicago",
    endorsements:[
      { bloggerId:"312food", blurb:"312food's neighbourhood guides consistently feature Wicker Park as one of Chicago's most liveable and characterful areas.", postUrl:"https://www.312food.com/" },
    ],
  },
  {
    id:7, name:"Chicago Riverwalk", area:"Downtown", cat:"Outdoors", emoji:"🌊",
    travelStyles:["conference","leisure","family","relocation"],
    note:"Fifteen minutes from McCormick. Walk west from the lake. Free decompression between sessions — or show clients what downtown living actually feels like.",
    by:"a1", saves:156, city:"Chicago",
    endorsements:[
      { bloggerId:"chicagofoodauthority", blurb:"Chicago Food Authority recommends the Riverwalk as the city's most underrated free experience — essential for any visit.", postUrl:"https://www.chicagofoodauthority.com/" },
      { bloggerId:"312food", blurb:"Erin Byrne's city guide lists the Riverwalk as a Chicago institution — as essential as the Bean.", postUrl:"https://www.312food.com/" },
    ],
  },
  {
    id:8, name:"Margie's Candies", area:"Bucktown", cat:"Dessert", emoji:"🍦",
    travelStyles:["family","relocation"],
    note:"Since 1921. The World's Largest Sundae split four ways has become a tradition on my first-visit client tours.",
    by:"a2", saves:44, city:"Chicago",
    endorsements:[
      { bloggerId:"chicagofoodiesisters", blurb:"The Foodie Sisters love Margie's as a Chicago classic — a historic ice cream parlour that never goes out of style.", postUrl:"https://chicagofoodiesisters.blogspot.com/" },
    ],
  },
];

const COLLECTIONS = [
  { id:"c1", title:"River North for Relocating Families",  by:"a1", pins:8, city:"Chicago", desc:"What I show every family considering River North. Schools proximity, weekend anchors, morning coffee. Updated monthly.",      updated:"2 weeks ago" },
  { id:"c2", title:"ACC Chicago — The Other 6 Hours",      by:"u1", pins:6, city:"Chicago", desc:"Conference windows done right. Everything within fifteen minutes of McCormick Place.",                                        updated:"1 month ago"  },
  { id:"c3", title:"Logan Square — Is It Right For You?",  by:"a1", pins:9, city:"Chicago", desc:"An honest look at the neighbourhood. Great for some families, wrong for others. I'll tell you which.",                       updated:"3 weeks ago"  },
];

// ── HELPERS ───────────────────────────────────────────────────
const toggle = (arr, val) => arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

// ── BASE COMPONENTS ───────────────────────────────────────────
function Mono({ children, style = {} }) {
  return <span style={{ fontFamily: FONT.body, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.muted, ...style }}>{children}</span>;
}

function Divider({ style = {} }) {
  return <div style={{ height: 1, background: C.hairline, ...style }} />;
}

function Avatar({ initials, size = 32, agent = false }) {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: agent ? C.agentLight : C.warm, border: `1px solid ${agent ? C.agentAccent : C.hairline}`, display: "flex", alignItems: "center", justifyContent: "center", color: agent ? C.agentInk : C.mid, fontSize: size * 0.3, fontWeight: 700, fontFamily: FONT.body, letterSpacing: 1 }}>
        {initials}
      </div>
      {agent && (
        <div style={{ position: "absolute", bottom: -1, right: -1, width: size * 0.3, height: size * 0.3, borderRadius: "50%", background: C.agentAccent, border: `1.5px solid ${C.white}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: C.white, fontSize: size * 0.13, fontWeight: 900 }}>✓</span>
        </div>
      )}
    </div>
  );
}

function AgentBadge({ size = "normal" }) {
  const small = size === "small";
  return <span style={{ fontFamily: FONT.body, fontSize: small ? 9 : 10, letterSpacing: small ? 1 : 1.5, textTransform: "uppercase", color: C.agentAccent, fontWeight: 700 }}>Relocation Specialist</span>;
}

function LocalExpertBadge({ city, size = "normal" }) {
  const small = size === "small";
  return <span style={{ fontFamily: FONT.body, fontSize: small ? 9 : 10, letterSpacing: small ? 1 : 1.5, textTransform: "uppercase", color: C.agentInk, fontWeight: 700, background: C.agentLight, padding: "2px 7px", border: `1px solid ${C.agentAccent}30` }}>{city} Local Expert</span>;
}

function CommunityBadge({ tier }) {
  const b = BADGE_TIERS.find(t => t.id === tier);
  if (!b) return null;
  return <span style={{ fontFamily: FONT.body, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: b.color, fontWeight: 600 }}>{b.label}</span>;
}

function Stars({ rating, count }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ display: "flex", gap: 1 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 11, color: i <= Math.round(rating) ? C.gold : C.hairline }}>★</span>)}</div>
      <span style={{ fontFamily: FONT.body, fontSize: 11, color: C.mid }}>{rating} · {count} reviews</span>
    </div>
  );
}

function SelectPill({ label, icon, selected, onToggle }) {
  return (
    <button onClick={onToggle} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"9px 16px", background: selected ? C.ink : C.white, color: selected ? C.white : C.softInk, border:`1px solid ${selected ? C.ink : C.hairline}`, borderRadius:0, cursor:"pointer", fontFamily:FONT.body, fontSize:13, fontWeight: selected ? 600 : 400, transition:"all 0.15s", letterSpacing:0.2 }}>
      <span style={{ fontSize:14 }}>{icon}</span>{label}{selected && <span style={{ fontSize:12, marginLeft:2 }}>✓</span>}
    </button>
  );
}

function PrimaryBtn({ label, onClick, disabled, style={} }) {
  return <button onClick={onClick} disabled={disabled} style={{ width:"100%", padding:"16px", background: disabled ? C.hairline : C.ink, color: disabled ? C.muted : C.white, border:"none", borderRadius:0, fontSize:12, fontWeight:600, letterSpacing:2, textTransform:"uppercase", cursor: disabled ? "not-allowed" : "pointer", fontFamily:FONT.body, transition:"all 0.2s", ...style }}>{label}</button>;
}

function GhostBtn({ label, onClick, style={} }) {
  return <button onClick={onClick} style={{ width:"100%", padding:"15px", background:C.white, color:C.softInk, border:`1px solid ${C.hairline}`, borderRadius:0, fontSize:12, fontWeight:500, letterSpacing:1.5, textTransform:"uppercase", cursor:"pointer", fontFamily:FONT.body, ...style }}>{label}</button>;
}

function TopNav({ title, subtitle, onBack }) {
  return (
    <div style={{ background:C.white, borderBottom:`1px solid ${C.hairline}`, padding:"16px 24px", display:"flex", alignItems:"center", gap:14, position:"sticky", top:0, zIndex:100 }}>
      {onBack && <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", color:C.mid, fontSize:22, lineHeight:1, padding:"0 8px 0 0", flexShrink:0 }}>←</button>}
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:FONT.display, fontSize:20, color:C.ink, fontWeight:600, lineHeight:1.1 }}>{title}</div>
        {subtitle && <Mono style={{ display:"block", marginTop:3 }}>{subtitle}</Mono>}
      </div>
    </div>
  );
}

// ── BLOGGER ENDORSEMENT STRIP ─────────────────────────────────
function EndorsementStrip({ endorsements }) {
  if (!endorsements || endorsements.length === 0) return null;
  return (
    <div style={{ borderTop:`1px solid ${C.hairline}`, marginTop:14, paddingTop:14 }}>
      <Mono style={{ display:"block", marginBottom:10, color: C.bloggerAccent }}>Highly recommended by</Mono>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {endorsements.map((e, i) => {
          const blogger = BLOGGERS[e.bloggerId];
          if (!blogger) return null;
          return (
            <div key={i} style={{ background:C.bloggerLight, border:`1px solid ${C.bloggerAccent}18`, padding:"12px 14px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                <div>
                  <span style={{ fontFamily:FONT.body, fontSize:12, color:C.bloggerInk, fontWeight:700 }}>{blogger.name}</span>
                  <span style={{ fontFamily:FONT.body, fontSize:11, color:C.muted, marginLeft:6 }}>{blogger.handle} · {blogger.followers} followers</span>
                </div>
                <a href={e.postUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily:FONT.body, fontSize:10, color:C.bloggerAccent, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", textDecoration:"none", whiteSpace:"nowrap", marginLeft:8, flexShrink:0 }}>
                  Read post →
                </a>
              </div>
              <p style={{ fontFamily:FONT.display, fontSize:14, color:C.softInk, fontStyle:"italic", lineHeight:1.7, margin:0 }}>{e.blurb}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── PIN CARD ──────────────────────────────────────────────────
function PinCard({ pin, myWorlds, onUserTap, expanded = false }) {
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(expanded);
  const user = ALL.find(u => u.id === pin.by);
  const isConn = connectionIds.includes(pin.by);
  const isSameWorld = user?.worlds?.some(w => myWorlds?.includes(w));
  const hasEndorsements = pin.endorsements && pin.endorsements.length > 0;

  return (
    <div style={{ background:C.white, border:`1px solid ${C.hairline}`, padding:"22px 20px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
        <div style={{ display:"flex", gap:10, alignItems:"flex-start", flex:1 }}>
          <span style={{ fontSize:24, lineHeight:1, flexShrink:0, marginTop:2 }}>{pin.emoji}</span>
          <div>
            <div style={{ fontFamily:FONT.display, fontSize:22, color:C.ink, fontWeight:600, lineHeight:1.1, marginBottom:3 }}>{pin.name}</div>
            <Mono>{pin.area} · {pin.cat}</Mono>
          </div>
        </div>
        <button onClick={() => setSaved(s=>!s)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:18, flexShrink:0, marginLeft:8, color: saved ? C.accent : C.muted }}>{saved ? "♥" : "♡"}</button>
      </div>

      <p style={{ fontFamily:FONT.body, fontSize:14, color:C.softInk, lineHeight:1.8, margin:"14px 0 16px", paddingLeft:34 }}>{pin.note}</p>

      {/* Blogger endorsement count teaser */}
      {hasEndorsements && (
        <div style={{ paddingLeft:34, marginBottom:14 }}>
          <button onClick={() => setOpen(o=>!o)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontFamily:FONT.body, fontSize:11, color:C.bloggerAccent, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase" }}>
              ★ Recommended by {pin.endorsements.length} blogger{pin.endorsements.length > 1 ? "s" : ""}
            </span>
            <span style={{ fontFamily:FONT.body, fontSize:11, color:C.muted }}>{open ? "▲" : "▼"}</span>
          </button>
        </div>
      )}

      {open && hasEndorsements && (
        <div style={{ paddingLeft:34, marginBottom:14 }}>
          <EndorsementStrip endorsements={pin.endorsements} />
        </div>
      )}

      <Divider style={{ marginBottom:12 }} />

      <div style={{ paddingLeft:34, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
        <button onClick={() => onUserTap && onUserTap(user)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", alignItems:"center", gap:8 }}>
          <Avatar initials={user?.avatar} size={28} agent={user?.isAgent} />
          <div style={{ textAlign:"left" }}>
            <div style={{ fontFamily:FONT.body, fontSize:12, color:C.softInk, fontWeight:600 }}>{user?.name}</div>
            <div style={{ fontFamily:FONT.body, fontSize:11, color:C.muted }}>{user?.worldLabel}</div>
          </div>
        </button>
        <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
          {user?.isAgent && <AgentBadge />}
          {user?.isAgent && user.expertCities?.map(c => <LocalExpertBadge key={c} city={c} />)}
          {!user?.isAgent && isConn && <Mono style={{ color:C.accent }}>Connection</Mono>}
          {!user?.isAgent && !isConn && isSameWorld && <Mono style={{ color:C.mid }}>Your world</Mono>}
          <Mono style={{ color:C.muted }}>{pin.saves + (saved ? 1 : 0)} saves</Mono>
        </div>
      </div>
    </div>
  );
}

// ── COLLECTION CARD ───────────────────────────────────────────
function CollectionCard({ col, onTap }) {
  const user = ALL.find(u => u.id === col.by);
  return (
    <button onClick={() => onTap(col)} style={{ display:"block", width:"100%", background:C.white, border:`1px solid ${C.hairline}`, padding:"22px 20px", textAlign:"left", cursor:"pointer", transition:"border-color 0.15s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = C.ink}
      onMouseLeave={e => e.currentTarget.style.borderColor = C.hairline}>
      {user?.isAgent && (
        <div style={{ display:"flex", gap:10, marginBottom:10 }}>
          <AgentBadge />{user.expertCities?.map(c=><LocalExpertBadge key={c} city={c} />)}
        </div>
      )}
      <div style={{ fontFamily:FONT.display, fontSize:20, color:C.ink, fontWeight:600, lineHeight:1.2, marginBottom:6 }}>{col.title}</div>
      <div style={{ fontFamily:FONT.body, fontSize:13, color:C.mid, lineHeight:1.7, marginBottom:16 }}>{col.desc}</div>
      <Divider style={{ marginBottom:12 }} />
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <Avatar initials={user?.avatar} size={24} agent={user?.isAgent} />
          <span style={{ fontFamily:FONT.body, fontSize:12, color:C.mid }}>{user?.name} · {col.pins} pins</span>
        </div>
        <Mono style={{ color:C.accent }}>Share →</Mono>
      </div>
    </button>
  );
}

// ── AGENT STRIP ───────────────────────────────────────────────
function AgentStrip({ agent, onTap }) {
  return (
    <div style={{ background:C.agentLight, border:`1px solid ${C.agentAccent}20`, padding:"20px" }}>
      <Mono style={{ color:C.agentAccent, marginBottom:14, display:"block" }}>Relocation expert in this city</Mono>
      <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:14 }}>
        <Avatar initials={agent.avatar} size={44} agent />
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:FONT.display, fontSize:19, color:C.agentInk, fontWeight:600, marginBottom:3 }}>{agent.name}</div>
          <AgentBadge /><div style={{ marginTop:4 }}><Stars rating={agent.rating} count={agent.ratingCount} /></div>
        </div>
      </div>
      <p style={{ fontFamily:FONT.body, fontSize:13, color:C.softInk, lineHeight:1.8, margin:"0 0 16px", fontStyle:"italic" }}>"{agent.bio.slice(0,110)}…"</p>
      <Divider style={{ marginBottom:14 }} />
      <div style={{ display:"flex", gap:10 }}>
        <button onClick={() => onTap(agent)} style={{ flex:1, padding:"12px", background:C.agentInk, color:C.white, border:"none", cursor:"pointer", fontFamily:FONT.body, fontSize:11, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase" }}>View profile</button>
        <button style={{ flex:1, padding:"12px", background:C.white, color:C.agentInk, border:`1px solid ${C.agentAccent}40`, cursor:"pointer", fontFamily:FONT.body, fontSize:11, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase" }}>Get in touch</button>
      </div>
    </div>
  );
}

// ── BLOGGER DIRECTORY ─────────────────────────────────────────
function BloggerDirectory() {
  return (
    <div style={{ paddingBottom:40 }}>
      <div style={{ padding:"24px 24px 16px" }}>
        <div style={{ fontFamily:FONT.display, fontSize:28, color:C.ink, fontWeight:600, marginBottom:8 }}>Trusted voices</div>
        <p style={{ fontFamily:FONT.display, fontSize:16, color:C.mid, lineHeight:1.7, fontStyle:"italic" }}>
          These are the bloggers and writers whose Chicago recommendations we surface throughout CityWindow. We link to their posts — we never reproduce their content.
        </p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
        {Object.values(BLOGGERS).map((b, i) => (
          <div key={b.id} style={{ background:C.white, border:`1px solid ${C.hairline}`, padding:"22px 20px", animation:`fadeUp 0.25s ease ${i*0.07}s both` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <div>
                <div style={{ fontFamily:FONT.display, fontSize:20, color:C.ink, fontWeight:600, marginBottom:3 }}>{b.name}</div>
                <Mono>{b.handle} · {b.followers} followers</Mono>
              </div>
              <a href={b.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily:FONT.body, fontSize:10, color:C.bloggerAccent, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", textDecoration:"none", flexShrink:0, marginLeft:12 }}>Visit →</a>
            </div>
            <p style={{ fontFamily:FONT.body, fontSize:13, color:C.mid, lineHeight:1.7, margin:0 }}>{b.desc}</p>
            <Divider style={{ marginTop:14, marginBottom:12 }} />
            <Mono>
              Recommends {PINS.filter(p => p.endorsements?.some(e => e.bloggerId === b.id)).length} places in Chicago
            </Mono>
          </div>
        ))}
      </div>
      <div style={{ padding:"24px", background:C.warm, borderTop:`1px solid ${C.hairline}` }}>
        <div style={{ fontFamily:FONT.display, fontSize:18, color:C.ink, fontWeight:600, marginBottom:6 }}>Are you a Chicago blogger or writer?</div>
        <p style={{ fontFamily:FONT.body, fontSize:13, color:C.mid, lineHeight:1.7, marginBottom:16 }}>We would love to feature your recommendations. We link to your posts and attribute everything to you — no content reproduction, ever.</p>
        <PrimaryBtn label="Get in touch →" onClick={() => {}} />
      </div>
    </div>
  );
}

// ── AGENT PROFILE ─────────────────────────────────────────────
function AgentProfile({ agent, onBack }) {
  const [contacted, setContacted] = useState(false);
  const agentPins = PINS.filter(p => p.by === agent.id);
  const agentCols = COLLECTIONS.filter(c => c.by === agent.id);
  return (
    <div style={{ minHeight:"100vh", background:C.paper, fontFamily:FONT.body, color:C.ink, maxWidth:480, margin:"0 auto" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap'); * { box-sizing:border-box; margin:0; padding:0; } @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} } a { text-decoration:none; }`}</style>
      <TopNav title={agent.name} subtitle={agent.worldLabel} onBack={onBack} />
      <div style={{ background:C.white, padding:"28px 24px" }}>
        <div style={{ display:"flex", gap:18, alignItems:"flex-start", marginBottom:22 }}>
          <Avatar initials={agent.avatar} size={64} agent />
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:FONT.display, fontSize:28, color:C.ink, fontWeight:600, lineHeight:1.1, marginBottom:5 }}>{agent.name}</div>
            <div style={{ fontFamily:FONT.body, fontSize:12, color:C.mid, marginBottom:8 }}>{agent.basedIn}</div>
            <Stars rating={agent.rating} count={agent.ratingCount} />
          </div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, paddingBottom:18, marginBottom:18, borderBottom:`1px solid ${C.hairline}` }}>
          <AgentBadge />{agent.expertCities.map(c=><LocalExpertBadge key={c} city={c} />)}<CommunityBadge tier={agent.communityTier} />
        </div>
        <p style={{ fontFamily:FONT.display, fontSize:17, color:C.softInk, lineHeight:1.85, fontStyle:"italic", marginBottom:22 }}>"{agent.bio}"</p>
        <div style={{ marginBottom:22 }}>
          <Mono style={{ display:"block", marginBottom:10 }}>Specialties</Mono>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{agent.specialties.map(s=><span key={s} style={{ fontFamily:FONT.body, fontSize:12, color:C.softInk, border:`1px solid ${C.hairline}`, padding:"4px 10px" }}>{s}</span>)}</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:1, marginBottom:22, border:`1px solid ${C.hairline}` }}>
          {[[agent.totalPins,"Pins"],[agent.totalCollections,"Collections"],[agent.expertCities.length,"Expert cities"]].map(([n,l],i)=>(
            <div key={l} style={{ padding:"14px 10px", textAlign:"center", background:C.white, borderRight:i<2?`1px solid ${C.hairline}`:"none" }}>
              <div style={{ fontFamily:FONT.display, fontSize:26, color:C.ink, fontWeight:600 }}>{n}</div>
              <Mono style={{ display:"block", marginTop:3 }}>{l}</Mono>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <PrimaryBtn label={contacted ? "Request sent ✓" : "Get in touch"} onClick={() => setContacted(true)} style={{ background: contacted ? C.agentAccent : C.agentInk }} />
          <GhostBtn label="Follow" />
        </div>
        {contacted && <p style={{ fontFamily:FONT.body, fontSize:12, color:C.mid, textAlign:"center", marginTop:12, lineHeight:1.6 }}>A brief follow-up survey will arrive in three weeks.</p>}
      </div>
      <div style={{ background:C.agentLight, borderTop:`1px solid ${C.agentAccent}20`, borderBottom:`1px solid ${C.agentAccent}20`, padding:"14px 24px", display:"flex", gap:12, alignItems:"center" }}>
        <span style={{ fontFamily:FONT.body, fontSize:16, color:C.agentAccent }}>✓</span>
        <div>
          <div style={{ fontFamily:FONT.body, fontSize:12, color:C.agentAccent, fontWeight:700 }}>Validated member since {agent.agentSince}</div>
          <div style={{ fontFamily:FONT.body, fontSize:11, color:C.mid, marginTop:1 }}>Reviewed and approved · Active contributor · Last active {agent.lastActive}</div>
        </div>
      </div>
      {agentCols.length > 0 && <div style={{ padding:"28px 0 0" }}><div style={{ padding:"0 24px 14px" }}><Mono>{agent.name.split(" ")[0]}'s city guides</Mono></div><div style={{ display:"flex", flexDirection:"column", gap:1 }}>{agentCols.map(col=><CollectionCard key={col.id} col={col} onTap={()=>{}} />)}</div></div>}
      {agentPins.length > 0 && <div style={{ padding:"28px 0 40px" }}><div style={{ padding:"0 24px 14px" }}><Mono>{agent.name.split(" ")[0]}'s pins</Mono></div><div style={{ display:"flex", flexDirection:"column", gap:1 }}>{agentPins.map(pin=><PinCard key={pin.id} pin={pin} myWorlds={[]} onUserTap={()=>{}} />)}</div></div>}
    </div>
  );
}

// ── BADGE SHEET ───────────────────────────────────────────────
function BadgeSheet({ onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(26,23,20,0.4)", zIndex:200, display:"flex", alignItems:"flex-end" }} onClick={onClose}>
      <div style={{ background:C.white, width:"100%", maxWidth:480, margin:"0 auto", padding:"32px 24px 48px" }} onClick={e=>e.stopPropagation()}>
        <div style={{ width:32, height:3, background:C.hairline, margin:"0 auto 28px" }} />
        <div style={{ fontFamily:FONT.display, fontSize:26, color:C.ink, fontWeight:600, marginBottom:6 }}>Understanding badges</div>
        <p style={{ fontFamily:FONT.body, fontSize:13, color:C.mid, lineHeight:1.7, marginBottom:24 }}>Badges signal expertise, trust, and contribution. Agent badges are earned through validation; community badges through consistent contribution.</p>
        <Mono style={{ display:"block", marginBottom:14 }}>Professional — Agents only</Mono>
        <div style={{ display:"flex", flexDirection:"column", gap:1, marginBottom:24 }}>
          {[{badge:<AgentBadge/>,desc:"Validated professional, reviewed and approved by CityWindow"},{badge:<LocalExpertBadge city="Chicago"/>,desc:"20+ pins and 2+ collections in a single city, min 3.8 rating"}].map((r,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 0", borderBottom:`1px solid ${C.hairline}` }}>
              <div style={{ minWidth:150 }}>{r.badge}</div>
              <div style={{ fontFamily:FONT.body, fontSize:12, color:C.mid, lineHeight:1.6 }}>{r.desc}</div>
            </div>
          ))}
        </div>
        <Mono style={{ display:"block", marginBottom:14 }}>Community — All contributors</Mono>
        <div style={{ display:"flex", flexDirection:"column", gap:1, marginBottom:28 }}>
          {BADGE_TIERS.map((b,i)=>(
            <div key={b.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 0", borderBottom:i<BADGE_TIERS.length-1?`1px solid ${C.hairline}`:"none" }}>
              <div style={{ minWidth:150 }}><CommunityBadge tier={b.id} /></div>
              <div style={{ fontFamily:FONT.body, fontSize:12, color:C.mid }}>{b.min}+ pins</div>
            </div>
          ))}
        </div>
        <PrimaryBtn label="Close" onClick={onClose} />
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────
export default function CityWindow() {
  const [travelStyles, setTravelStyles] = useState(["relocation","conference"]);
  const [worlds, setWorlds]             = useState(["healthcare","education"]);
  const [trustFilter, setTrustFilter]   = useState("all");
  const [activeTab, setActiveTab]       = useState("pins");
  const [viewingAgent, setViewingAgent] = useState(null);
  const [viewingCol, setViewingCol]     = useState(null);
  const [showBadges, setShowBadges]     = useState(false);
  const [copied, setCopied]             = useState(false);
  const destination = "Chicago";

  const css = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap'); * { box-sizing:border-box; margin:0; padding:0; } @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} } a { text-decoration:none; } button { -webkit-tap-highlight-color:transparent; } ::-webkit-scrollbar { display:none; }`;
  const page = { minHeight:"100vh", background:C.paper, fontFamily:FONT.body, color:C.ink, maxWidth:480, margin:"0 auto" };
  const isRelocation = travelStyles.includes("relocation");

  const filteredPins = PINS
    .filter(p => travelStyles.length === 0 || p.travelStyles.some(s => travelStyles.includes(s)))
    .sort((a, b) => {
      const ac = connectionIds.includes(a.by), bc = connectionIds.includes(b.by);
      if (ac && !bc) return -1; if (!ac && bc) return 1;
      return b.saves - a.saves;
    });

  if (viewingAgent) return <AgentProfile agent={viewingAgent} onBack={() => setViewingAgent(null)} />;

  if (viewingCol) {
    const user = ALL.find(u => u.id === viewingCol.by);
    const colPins = PINS.slice(0, viewingCol.pins);
    return (
      <div style={page}>
        <style>{css}</style>
        <TopNav title={viewingCol.title} onBack={() => setViewingCol(null)} />
        <div style={{ background:C.white, padding:"22px 24px", borderBottom:`1px solid ${C.hairline}` }}>
          {user?.isAgent && <div style={{ display:"flex", gap:10, marginBottom:10 }}><AgentBadge />{user.expertCities?.map(c=><LocalExpertBadge key={c} city={c} />)}</div>}
          <p style={{ fontFamily:FONT.body, fontSize:13, color:C.mid, lineHeight:1.7, marginBottom:16 }}>{viewingCol.desc}</p>
          <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:14 }}>
            <Avatar initials={user?.avatar} size={32} agent={user?.isAgent} />
            <div>
              <div style={{ fontFamily:FONT.body, fontSize:13, color:C.softInk, fontWeight:600 }}>{user?.name}</div>
              {user?.isAgent && <div style={{ fontFamily:FONT.body, fontSize:11, color:C.mid }}>{user.basedIn}</div>}
            </div>
            {user?.isAgent && <button onClick={() => setViewingAgent(user)} style={{ marginLeft:"auto", padding:"7px 14px", background:"none", border:`1px solid ${C.agentAccent}40`, color:C.agentAccent, cursor:"pointer", fontFamily:FONT.body, fontSize:10, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase" }}>View agent</button>}
          </div>
          <Divider style={{ marginBottom:14 }} />
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <Mono>{viewingCol.pins} pins · Updated {viewingCol.updated}</Mono>
            <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:FONT.body, fontSize:10, color: copied ? C.agentAccent : C.accent, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase" }}>
              {copied ? "Copied ✓" : "Copy link →"}
            </button>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:1, padding:"16px 0" }}>
          {colPins.map(pin => <PinCard key={pin.id} pin={pin} myWorlds={worlds} onUserTap={u => u?.isAgent && setViewingAgent(u)} />)}
        </div>
      </div>
    );
  }

  return (
    <div style={page}>
      <style>{css}</style>
      {showBadges && <BadgeSheet onClose={() => setShowBadges(false)} />}

      {/* Masthead */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.hairline}`, padding:"18px 24px 14px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
          <div>
            <div style={{ fontFamily:FONT.display, fontSize:12, letterSpacing:4, textTransform:"uppercase", color:C.accent, marginBottom:4 }}>CityWindow</div>
            <div style={{ fontFamily:FONT.display, fontSize:28, color:C.ink, fontWeight:600, lineHeight:1 }}>{destination}</div>
          </div>
          <button onClick={() => setShowBadges(true)} style={{ background:"none", border:`1px solid ${C.hairline}`, padding:"7px 12px", cursor:"pointer", fontFamily:FONT.body, fontSize:10, letterSpacing:1.5, textTransform:"uppercase", color:C.mid }}>Badges</button>
        </div>
        <div style={{ display:"flex", borderTop:`1px solid ${C.hairline}` }}>
          {[{id:"all",label:"Everyone"},{id:"world",label:"My world"},{id:"connections",label:"Connections"}].map(f=>(
            <button key={f.id} onClick={() => setTrustFilter(f.id)} style={{ flex:1, padding:"10px 4px", background:"none", border:"none", borderBottom:`2px solid ${trustFilter===f.id?C.ink:"transparent"}`, color:trustFilter===f.id?C.ink:C.muted, cursor:"pointer", fontFamily:FONT.body, fontSize:11, fontWeight:trustFilter===f.id?700:400, letterSpacing:1, textTransform:"uppercase", transition:"all 0.15s" }}>{f.label}</button>
          ))}
        </div>
      </div>

      {/* Context */}
      {travelStyles.length > 0 && (
        <div style={{ background:C.white, borderBottom:`1px solid ${C.hairline}`, padding:"10px 24px", display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          {travelStyles.map(s => { const t = TRAVEL_STYLES.find(ts=>ts.id===s); return <span key={s} style={{ fontFamily:FONT.body, fontSize:10, letterSpacing:1.5, textTransform:"uppercase", color:C.accent, border:`1px solid ${C.accent}30`, padding:"3px 8px" }}>{t?.label}</span>; })}
          <button style={{ marginLeft:"auto", background:"none", border:"none", fontFamily:FONT.body, fontSize:10, color:C.muted, cursor:"pointer", letterSpacing:1, textTransform:"uppercase" }}>Edit</button>
        </div>
      )}

      {/* Tabs — now includes Bloggers */}
      <div style={{ display:"flex", background:C.white, borderBottom:`1px solid ${C.hairline}` }}>
        {[["pins","Pins"],["collections","Collections"],["agents","Agents"],["bloggers","Voices"]].map(([id,label])=>(
          <button key={id} onClick={() => setActiveTab(id)} style={{ flex:1, padding:"13px 4px", background:"none", border:"none", borderBottom:`2px solid ${activeTab===id?C.ink:"transparent"}`, color:activeTab===id?C.ink:C.muted, cursor:"pointer", fontFamily:FONT.body, fontSize:10, fontWeight:activeTab===id?700:400, letterSpacing:1.5, textTransform:"uppercase", transition:"all 0.15s" }}>{label}</button>
        ))}
      </div>

      {/* PINS */}
      {activeTab === "pins" && (
        <div style={{ paddingBottom:40 }}>
          {isRelocation && <div style={{ padding:"20px 0 1px" }}><AgentStrip agent={AGENTS[0]} onTap={a=>setViewingAgent(a)} /></div>}
          {filteredPins.some(p=>connectionIds.includes(p.by)) && (
            <div style={{ padding:"20px 24px 12px", display:"flex", alignItems:"center", gap:12 }}>
              <Mono>From your connections</Mono><div style={{ flex:1, height:1, background:C.hairline }} />
            </div>
          )}
          <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
            {filteredPins.map((pin,i)=>{
              const isConn = connectionIds.includes(pin.by);
              const prevConn = i>0 && connectionIds.includes(filteredPins[i-1].by);
              const showDiv = i>0 && !isConn && prevConn;
              return (
                <div key={pin.id} style={{ animation:`fadeUp 0.3s ease ${i*0.04}s both` }}>
                  {showDiv && <div style={{ padding:"20px 24px 12px", display:"flex", alignItems:"center", gap:12 }}><Mono>Also recommended</Mono><div style={{ flex:1, height:1, background:C.hairline }} /></div>}
                  <PinCard pin={pin} myWorlds={worlds} onUserTap={u=>u?.isAgent&&setViewingAgent(u)} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* COLLECTIONS */}
      {activeTab === "collections" && (
        <div style={{ paddingBottom:40 }}>
          <div style={{ padding:"22px 24px 16px" }}>
            <p style={{ fontFamily:FONT.display, fontSize:16, color:C.mid, lineHeight:1.7, fontStyle:"italic" }}>Curated guides from people who know {destination}. Share any collection with a single link.</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
            {COLLECTIONS.map((col,i)=><div key={col.id} style={{ animation:`fadeUp 0.25s ease ${i*0.07}s both` }}><CollectionCard col={col} onTap={c=>setViewingCol(c)} /></div>)}
          </div>
          <div style={{ padding:"20px 24px" }}>
            <button style={{ width:"100%", padding:"16px", background:"none", border:`1px dashed ${C.hairline}`, color:C.muted, cursor:"pointer", fontFamily:FONT.body, fontSize:11, letterSpacing:2, textTransform:"uppercase" }}>+ Create a collection</button>
          </div>
        </div>
      )}

      {/* AGENTS */}
      {activeTab === "agents" && (
        <div style={{ paddingBottom:40 }}>
          <div style={{ padding:"22px 24px 16px" }}>
            <p style={{ fontFamily:FONT.display, fontSize:16, color:C.mid, lineHeight:1.7, fontStyle:"italic" }}>Validated relocation specialists in {destination}. Each agent is reviewed and approved by CityWindow before listing.</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
            {AGENTS.map((agent,i)=>(
              <div key={agent.id} style={{ background:C.white, border:`1px solid ${C.hairline}`, padding:"24px 20px", animation:`fadeUp 0.3s ease ${i*0.1}s both` }}>
                <div style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom:16 }}>
                  <Avatar initials={agent.avatar} size={52} agent />
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:FONT.display, fontSize:22, color:C.ink, fontWeight:600, marginBottom:3 }}>{agent.name}</div>
                    <div style={{ fontFamily:FONT.body, fontSize:11, color:C.mid, marginBottom:8 }}>{agent.basedIn}</div>
                    <Stars rating={agent.rating} count={agent.ratingCount} />
                  </div>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8, paddingBottom:14, marginBottom:14, borderBottom:`1px solid ${C.hairline}` }}>
                  <AgentBadge />{agent.expertCities.map(c=><LocalExpertBadge key={c} city={c} />)}
                </div>
                <p style={{ fontFamily:FONT.display, fontSize:15, color:C.softInk, lineHeight:1.8, fontStyle:"italic", marginBottom:16 }}>"{agent.bio.slice(0,120)}…"</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:18 }}>
                  {agent.specialties.slice(0,3).map(s=><span key={s} style={{ fontFamily:FONT.body, fontSize:11, color:C.mid, border:`1px solid ${C.hairline}`, padding:"3px 8px" }}>{s}</span>)}
                </div>
                <button onClick={() => setViewingAgent(agent)} style={{ width:"100%", padding:"13px", background:C.agentInk, color:C.white, border:"none", cursor:"pointer", fontFamily:FONT.body, fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase" }}>View full profile →</button>
              </div>
            ))}
          </div>
          <div style={{ background:C.warm, padding:"28px 24px", borderTop:`1px solid ${C.hairline}` }}>
            <div style={{ fontFamily:FONT.display, fontSize:22, color:C.ink, fontWeight:600, marginBottom:8 }}>Are you a relocation specialist?</div>
            <p style={{ fontFamily:FONT.body, fontSize:13, color:C.mid, lineHeight:1.7, marginBottom:18 }}>Apply to become a validated CityWindow agent. Connect with people actively exploring your cities.</p>
            <PrimaryBtn label="Apply to join →" onClick={() => {}} />
          </div>
        </div>
      )}

      {/* BLOGGERS / VOICES TAB */}
      {activeTab === "bloggers" && <BloggerDirectory />}
    </div>
  );
}
