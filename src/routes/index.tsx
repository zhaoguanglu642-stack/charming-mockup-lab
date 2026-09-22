import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell, CalendarDays, Check, ChevronDown, ChevronRight, CircleUserRound,
  Clock3, Coins, Crown, Gift, GlassWater, House, MapPin, Minus, Plus,
  QrCode, ScanLine, ShoppingBag, Trophy, UtensilsCrossed, WalletCards, X,
} from "lucide-react";
import { AppButton } from "../components/AppButton";
import heroImage from "../assets/tavern-hero.jpg";
import lagerImage from "../assets/amber-lager.jpg";
import dunkelImage from "../assets/dunkel-beer.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "客满酒馆｜可交互会员首页" },
      { name: "description", content: "客满酒馆移动会员端交互演示，提供点单、赛事、订桌和会员服务。" },
      { property: "og:title", content: "客满酒馆｜可交互会员首页" },
      { property: "og:description", content: "点单、赛事、订桌与会员资产一站直达。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Panel = "store" | "messages" | "order" | "events" | "booking" | "storage" | "profile" | "qr" | null;
type NavKey = "home" | "order" | "events" | "profile";

const services = [
  { key: "order" as const, label: "扫码点单", note: "桌边即点", icon: ScanLine, featured: true },
  { key: "events" as const, label: "赛事中心", note: "今晚 3 场", icon: Trophy },
  { key: "booking" as const, label: "预订桌台", note: "余位 6 桌", icon: CalendarDays },
  { key: "storage" as const, label: "我的存酒", note: "2 瓶在存", icon: GlassWater },
];

function Index() {
  const [panel, setPanel] = useState<Panel>(null);
  const [activeNav, setActiveNav] = useState<NavKey>("home");
  const [cartCount, setCartCount] = useState(0);
  const [registered, setRegistered] = useState(false);
  const [toast, setToast] = useState("");

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const openPanel = (next: Exclude<Panel, null>, nav?: NavKey) => {
    setPanel(next);
    if (nav) setActiveNav(nav);
  };

  return (
    <main className="min-h-screen bg-page text-foreground font-sans">
      <div className="mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-background pb-28 shadow-phone">
        <section className="relative h-[326px] overflow-hidden">
          <img src={heroImage} width={1024} height={768} alt="客满酒馆内景与精酿啤酒" className="h-full w-full object-cover object-[62%_center]" />
          <div className="absolute inset-0 bg-hero-shade" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5">
            <div>
              <p className="font-display text-[11px] uppercase text-primary">KEMAN BIERHALLE</p>
              <AppButton onClick={() => openPanel("store")} className="mt-1 flex items-center gap-1 bg-transparent text-left text-lg font-semibold text-foreground active:opacity-70">
                客满酒馆 · 环球港店 <ChevronDown className="size-4 text-primary" />
              </AppButton>
            </div>
            <AppButton onClick={() => openPanel("messages")} aria-label="消息" className="relative grid size-10 place-items-center rounded-full border border-line bg-glass text-foreground backdrop-blur-md active:scale-95">
              <Bell className="size-[18px]" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-alert" />
            </AppButton>
          </div>
          <div className="absolute inset-x-5 bottom-5">
            <div className="mb-3 flex items-center gap-2 text-xs text-soft"><span className="inline-flex items-center gap-1 rounded-sm bg-open px-2 py-1 font-semibold text-open-foreground">营业中</span><MapPin className="size-3.5" /> 距你 1.8 km</div>
            <h1 className="font-display text-[34px] font-semibold leading-[1.12]">今晚，举杯入局</h1>
            <p className="mt-2 text-sm text-soft">精酿现打 · 德扑锦标赛 · 订桌免排队</p>
          </div>
        </section>

        <section className="relative -mt-1 px-4">
          <div className="grid grid-cols-4 overflow-hidden rounded-md border border-line bg-panel shadow-panel">
            {services.map(({ key, label, note, icon: Icon, featured }) => (
              <Link key={label} to={`/${key}` as "/order" | "/events" | "/booking" | "/storage"} className={`flex min-w-0 flex-col items-center border-r border-line px-1 py-4 last:border-r-0 active:brightness-125 ${featured ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground"}`}>
                <Icon className="mb-2 size-5" strokeWidth={1.8} /><span className="text-xs font-semibold">{label}</span><span className={`mt-1 text-[10px] ${featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{note}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4 pt-7">
          <div className="flex items-end justify-between"><div><p className="section-kicker">TODAY'S MATCH</p><h2 className="mt-1 font-display text-xl font-semibold">今日赛事</h2></div><Link to="/events" className="flex items-center gap-1 text-xs text-muted-foreground">全部赛事 <ChevronRight className="size-4" /></Link></div>
          <div className="mt-3 overflow-hidden rounded-md border border-primary/40 bg-panel">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[11px]"><span className={`flex items-center gap-2 font-semibold ${registered ? "text-open" : "text-alert"}`}><span className={`size-1.5 rounded-full ${registered ? "bg-open" : "animate-pulse bg-alert"}`} />{registered ? "已报名" : "报名中"}</span><span className="text-muted-foreground">剩余 {registered ? 7 : 8} 席</span></div>
            <div className="flex items-center px-4 py-4"><div className="min-w-0 flex-1"><p className="text-xs text-primary">09月22日 · 20:30</p><h3 className="mt-1.5 text-base font-semibold">秋季德扑锦标赛</h3><p className="mt-1 text-xs text-muted-foreground">快速赛 · 起始筹码 20,000</p></div><div className="border-l border-line pl-4 text-right"><p className="text-[10px] text-muted-foreground">奖励池</p><p className="mt-1 font-display text-2xl font-semibold text-primary">¥8,800</p><AppButton disabled={registered} onClick={() => openPanel("events", "events")} className="mt-2 rounded-sm bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground disabled:bg-muted disabled:text-muted-foreground">{registered ? "报名成功" : "立即报名"}</AppButton></div></div>
          </div>
        </section>

        <section className="px-4 pt-7">
          <div className="flex items-end justify-between"><div><p className="section-kicker">HOUSE POUR</p><h2 className="mt-1 font-display text-xl font-semibold">今夜畅饮</h2></div><Link to="/order" className="flex items-center gap-1 text-xs text-muted-foreground">查看菜单 <ChevronRight className="size-4" /></Link></div>
          <div className="mt-3 grid grid-cols-2 gap-3"><Drink image={lagerImage} name="慕尼黑琥珀拉格" meta="500ml · 麦香清爽" price="32" onAdd={() => { setCartCount((count) => count + 1); notify("已加入点单篮"); }} /><Drink image={dunkelImage} name="巴伐利亚黑啤" meta="500ml · 焦香醇厚" price="38" onAdd={() => { setCartCount((count) => count + 1); notify("已加入点单篮"); }} /></div>
        </section>

        <section className="px-4 pt-7">
          <div className="rounded-md border border-line bg-member p-4">
            <Link to="/member" className="flex w-full items-center justify-between text-left text-foreground"><span className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full border border-primary/50 bg-background"><Crown className="size-5 text-primary" /></span><span><span className="block text-sm font-semibold">晚上好，Alex</span><span className="mt-0.5 block text-[11px] text-muted-foreground">黑金会员 · 距升级还差 360 积分</span></span></span><ChevronRight className="size-4 text-muted-foreground" /></Link>
            <div className="mt-4 grid grid-cols-3 border-y border-line py-3 text-center"><Asset icon={WalletCards} value="760.00" label="余额" /><Asset icon={Coins} value="1,280" label="游戏币" /><Asset icon={Gift} value="3,640" label="积分" /></div>
            <AppButton onClick={() => openPanel("qr")} className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm border border-primary/40 bg-primary-soft py-2.5 text-xs font-semibold text-primary"><QrCode className="size-4" />出示会员核销码</AppButton>
          </div>
        </section>

        <nav className="fixed bottom-0 left-1/2 z-20 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-4 border-t border-line bg-nav px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
          <NavItem icon={House} label="首页" active={activeNav === "home"} onClick={() => { setActiveNav("home"); setPanel(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          <NavItem icon={UtensilsCrossed} label="点单" badge={cartCount} active={activeNav === "order"} to="/order" />
          <NavItem icon={Trophy} label="赛事" active={activeNav === "events"} to="/events" />
          <NavItem icon={CircleUserRound} label="我的" active={activeNav === "profile"} onClick={() => window.location.assign("/member")} />
        </nav>

        {toast && <div role="status" className="fixed left-1/2 top-5 z-50 flex -translate-x-1/2 items-center gap-2 rounded-sm border border-primary/30 bg-panel px-4 py-2.5 text-xs font-medium shadow-panel"><Check className="size-4 text-open" />{toast}</div>}
        {panel && <InteractiveSheet panel={panel} cartCount={cartCount} registered={registered} onClose={() => setPanel(null)} onNotify={notify} onRegister={() => { setRegistered(true); notify("报名成功，请准时到店"); setPanel(null); }} />}
      </div>
    </main>
  );
}

function InteractiveSheet({ panel, cartCount, registered, onClose, onNotify, onRegister }: { panel: Exclude<Panel, null>; cartCount: number; registered: boolean; onClose: () => void; onNotify: (message: string) => void; onRegister: () => void }) {
  const [selected, setSelected] = useState("20:00");
  const titles: Record<Exclude<Panel, null>, string> = { store: "选择门店", messages: "消息中心", order: "桌边点单", events: "赛事中心", booking: "预订桌台", storage: "我的存酒", profile: "会员中心", qr: "会员核销码" };
  return <div className="fixed inset-0 z-40 flex items-end justify-center bg-overlay" role="presentation" onClick={onClose}>
    <section role="dialog" aria-modal="true" aria-label={titles[panel]} onClick={(event) => event.stopPropagation()} className="sheet-enter max-h-[78vh] w-full max-w-[430px] overflow-y-auto rounded-t-2xl border-x border-t border-line bg-background px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-3 shadow-sheet">
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" /><div className="flex items-center justify-between"><h2 className="font-display text-xl font-semibold">{titles[panel]}</h2><AppButton onClick={onClose} aria-label="关闭" className="grid size-9 place-items-center rounded-full bg-muted text-muted-foreground"><X className="size-4" /></AppButton></div>
      {panel === "store" && <div className="mt-5 space-y-2"><Choice title="环球港店" note="营业中 · 距你 1.8 km" active onClick={() => { onNotify("已切换至环球港店"); onClose(); }} /><Choice title="静安寺店" note="营业中 · 距你 4.2 km" onClick={() => { onNotify("已切换至静安寺店"); onClose(); }} /><Choice title="新天地店" note="17:00 营业 · 距你 6.5 km" onClick={() => onNotify("该门店尚未营业")} /></div>}
      {panel === "messages" && <div className="mt-5 space-y-3"><InfoRow icon={Gift} title="会员日双倍积分" note="今晚 18:00—22:00 到店消费可享" /><InfoRow icon={Trophy} title="赛事即将开始" note="秋季德扑锦标赛 · 20:30 开赛" /><InfoRow icon={GlassWater} title="存酒到期提醒" note="1 瓶黑啤将在 7 天后到期" /></div>}
      {panel === "order" && <div className="mt-5"><div className="rounded-md border border-primary/30 bg-primary-soft p-4"><div className="flex items-center gap-3"><ScanLine className="size-7 text-primary" /><div><p className="text-sm font-semibold">扫描桌台二维码</p><p className="mt-1 text-xs text-muted-foreground">识别桌号后即可直接下单</p></div></div><AppButton onClick={() => onNotify("正在调用相机扫码")} className="mt-4 w-full rounded-sm bg-primary py-3 text-sm font-semibold text-primary-foreground">开始扫码</AppButton></div><div className="mt-4 flex items-center justify-between rounded-md border border-line bg-panel p-4"><div><p className="text-sm font-semibold">点单篮</p><p className="mt-1 text-xs text-muted-foreground">已选择 {cartCount} 件酒品</p></div><ShoppingBag className="size-5 text-primary" /></div></div>}
      {panel === "events" && <div className="mt-5 rounded-md border border-line bg-panel p-4"><p className="text-xs text-primary">09月22日 · 20:30</p><h3 className="mt-1 text-base font-semibold">秋季德扑锦标赛</h3><div className="mt-4 grid grid-cols-2 gap-2 text-xs"><span className="rounded-sm bg-muted p-3 text-muted-foreground">奖励池<br/><b className="mt-1 block text-base text-foreground">¥8,800</b></span><span className="rounded-sm bg-muted p-3 text-muted-foreground">剩余席位<br/><b className="mt-1 block text-base text-foreground">{registered ? 7 : 8} 席</b></span></div><AppButton disabled={registered} onClick={onRegister} className="mt-4 w-full rounded-sm bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:bg-muted disabled:text-muted-foreground">{registered ? "已成功报名" : "确认报名"}</AppButton></div>}
      {panel === "booking" && <div className="mt-5"><p className="mb-3 text-xs text-muted-foreground">选择今晚到店时间</p><div className="grid grid-cols-3 gap-2">{["19:00", "20:00", "21:00", "22:00", "23:00", "00:00"].map((time) => <AppButton key={time} onClick={() => setSelected(time)} className={`rounded-sm border py-3 text-sm ${selected === time ? "border-primary bg-primary-soft text-primary" : "border-line bg-panel text-foreground"}`}>{time}</AppButton>)}</div><div className="mt-4 flex items-center justify-between rounded-md border border-line bg-panel p-4"><div><p className="text-sm font-semibold">4 人桌</p><p className="mt-1 text-xs text-muted-foreground">大厅 · 靠窗区域</p></div><div className="flex items-center gap-3"><AppButton aria-label="减少人数" className="grid size-7 place-items-center rounded-full bg-muted"><Minus className="size-3" /></AppButton><span>4</span><AppButton aria-label="增加人数" className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground"><Plus className="size-3" /></AppButton></div></div><AppButton onClick={() => { onNotify(`已预留今晚 ${selected} 的桌台`); onClose(); }} className="mt-4 w-full rounded-sm bg-primary py-3 text-sm font-semibold text-primary-foreground">确认预订</AppButton></div>}
      {panel === "storage" && <div className="mt-5 space-y-3"><StoredDrink name="巴伐利亚黑啤" amount="1 瓶" expiry="剩余 28 天" /><StoredDrink name="慕尼黑琥珀拉格" amount="1 瓶" expiry="剩余 7 天" /><AppButton onClick={() => { onNotify("已提交取酒申请"); onClose(); }} className="w-full rounded-sm bg-primary py-3 text-sm font-semibold text-primary-foreground">申请取酒</AppButton></div>}
      {panel === "profile" && <div className="mt-5"><div className="rounded-md border border-primary/30 bg-member p-4"><div className="flex items-center gap-3"><div className="grid size-12 place-items-center rounded-full border border-primary/50"><Crown className="size-6 text-primary" /></div><div><p className="font-semibold">Alex · 黑金会员</p><p className="mt-1 text-xs text-muted-foreground">本月已到店 6 次</p></div></div></div><div className="mt-3 grid grid-cols-2 gap-2"><ProfileLink label="消费订单" value="12" /><ProfileLink label="优惠券" value="5" /><ProfileLink label="桌台预订" value="2" /><ProfileLink label="我的酒卡" value="3" /></div></div>}
      {panel === "qr" && <div className="mt-5 text-center"><div className="mx-auto grid size-52 place-items-center rounded-md bg-foreground p-5"><div className="qr-pattern size-full" /></div><p className="mt-4 text-sm font-semibold">Alex · 黑金会员</p><p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3" />每 60 秒自动更新，请向店员出示</p></div>}
    </section>
  </div>;
}

function Choice({ title, note, active = false, onClick }: { title: string; note: string; active?: boolean; onClick: () => void }) { return <AppButton onClick={onClick} className={`flex w-full items-center justify-between rounded-md border p-4 text-left ${active ? "border-primary bg-primary-soft" : "border-line bg-panel"}`}><span><span className="block text-sm font-semibold">{title}</span><span className="mt-1 block text-xs text-muted-foreground">{note}</span></span>{active && <Check className="size-4 text-primary" />}</AppButton>; }
function InfoRow({ icon: Icon, title, note }: { icon: typeof Gift; title: string; note: string }) { return <div className="flex gap-3 rounded-md border border-line bg-panel p-4"><div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft"><Icon className="size-4 text-primary" /></div><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{note}</p></div></div>; }
function StoredDrink({ name, amount, expiry }: { name: string; amount: string; expiry: string }) { return <div className="flex items-center justify-between rounded-md border border-line bg-panel p-4"><div className="flex items-center gap-3"><GlassWater className="size-5 text-primary" /><div><p className="text-sm font-semibold">{name}</p><p className="mt-1 text-xs text-muted-foreground">{expiry}</p></div></div><span className="text-sm text-primary">{amount}</span></div>; }
function ProfileLink({ label, value }: { label: string; value: string }) { return <AppButton className="flex items-center justify-between rounded-md border border-line bg-panel p-4 text-left text-sm"><span>{label}</span><span className="flex items-center text-muted-foreground">{value}<ChevronRight className="ml-1 size-3" /></span></AppButton>; }
function Drink({ image, name, meta, price, onAdd }: { image: string; name: string; meta: string; price: string; onAdd: () => void }) { return <article className="overflow-hidden rounded-md border border-line bg-panel"><img src={image} alt={name} loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full object-cover" /><div className="p-3"><h3 className="truncate text-sm font-semibold">{name}</h3><p className="mt-1 text-[11px] text-muted-foreground">{meta}</p><div className="mt-3 flex items-center justify-between"><p className="font-display text-lg font-semibold text-primary"><span className="text-xs">¥</span>{price}</p><AppButton onClick={onAdd} aria-label={`添加${name}`} className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground active:scale-90"><Plus className="size-4" /></AppButton></div></div></article>; }
function Asset({ icon: Icon, value, label }: { icon: typeof Coins; value: string; label: string }) { return <div className="border-r border-line last:border-r-0"><Icon className="mx-auto size-4 text-primary" /><p className="mt-1.5 font-display text-lg font-semibold">{value}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{label}</p></div>; }
function NavItem({ icon: Icon, label, active, badge = 0, onClick, to }: { icon: typeof House; label: string; active: boolean; badge?: number; onClick?: () => void; to?: "/order" | "/events" | "/member" }) { const content = <><span className="relative"><Icon className="size-5" strokeWidth={active ? 2.2 : 1.7} />{badge > 0 && <span className="absolute -right-3 -top-2 grid min-w-4 place-items-center rounded-full bg-alert px-1 text-[9px] text-foreground">{badge}</span>}</span><span className="text-[11px] font-medium">{label}</span></>; return to ? <Link to={to} className={`relative flex flex-col items-center gap-1 ${active ? "text-primary" : "text-muted-foreground"}`}>{content}</Link> : <AppButton onClick={onClick} className={`relative flex flex-col items-center gap-1 bg-transparent ${active ? "text-primary" : "text-muted-foreground"}`}>{content}</AppButton>; }
