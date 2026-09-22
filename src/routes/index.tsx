import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Coins,
  Crown,
  Gift,
  GlassWater,
  House,
  MapPin,
  QrCode,
  ScanLine,
  Trophy,
  UtensilsCrossed,
  WalletCards,
} from "lucide-react";
import { AppButton } from "../components/AppButton";
import heroImage from "../assets/tavern-hero.jpg";
import lagerImage from "../assets/amber-lager.jpg";
import dunkelImage from "../assets/dunkel-beer.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "客满酒馆｜会员首页" },
      { name: "description", content: "客满酒馆移动会员端，提供点单、赛事、订桌和会员服务。" },
      { property: "og:title", content: "客满酒馆｜会员首页" },
      { property: "og:description", content: "点单、赛事、订桌与会员资产一站直达。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { label: "扫码点单", note: "桌边即点", icon: ScanLine, featured: true },
  { label: "赛事中心", note: "今晚 3 场", icon: Trophy },
  { label: "预订桌台", note: "余位 6 桌", icon: CalendarDays },
  { label: "我的存酒", note: "2 瓶在存", icon: GlassWater },
];

function Index() {
  return (
    <main className="min-h-screen bg-page text-foreground font-sans">
      <div className="mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-background pb-28 shadow-phone">
        <section className="relative h-[326px] overflow-hidden">
          <img src={heroImage} width={1024} height={768} alt="客满酒馆内景与精酿啤酒" className="h-full w-full object-cover object-[62%_center]" />
          <div className="absolute inset-0 bg-hero-shade" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5">
            <div>
              <p className="font-display text-[11px] uppercase text-primary">KEMAN BIERHALLE</p>
              <AppButton className="mt-1 flex items-center gap-1 bg-transparent text-left text-lg font-semibold text-foreground">
                客满酒馆 · 环球港店 <ChevronDown className="size-4 text-primary" />
              </AppButton>
            </div>
            <AppButton aria-label="消息" className="relative grid size-10 place-items-center rounded-full border border-line bg-glass text-foreground backdrop-blur-md">
              <Bell className="size-[18px]" />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-alert" />
            </AppButton>
          </div>
          <div className="absolute inset-x-5 bottom-5">
            <div className="mb-3 flex items-center gap-2 text-xs text-soft">
              <span className="inline-flex items-center gap-1 rounded-sm bg-open px-2 py-1 font-semibold text-open-foreground">营业中</span>
              <MapPin className="size-3.5" /> 距你 1.8 km
            </div>
            <h1 className="font-display text-[34px] font-semibold leading-[1.12]">今晚，举杯入局</h1>
            <p className="mt-2 text-sm text-soft">精酿现打 · 德扑锦标赛 · 订桌免排队</p>
          </div>
        </section>

        <section className="relative -mt-1 px-4">
          <div className="grid grid-cols-4 overflow-hidden rounded-md border border-line bg-panel shadow-panel">
            {services.map(({ label, note, icon: Icon, featured }) => (
              <AppButton key={label} className={`flex min-w-0 flex-col items-center border-r border-line px-1 py-4 last:border-r-0 ${featured ? "bg-primary text-primary-foreground" : "bg-transparent text-foreground"}`}>
                <Icon className="mb-2 size-5" strokeWidth={1.8} />
                <span className="text-xs font-semibold">{label}</span>
                <span className={`mt-1 text-[10px] ${featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{note}</span>
              </AppButton>
            ))}
          </div>
        </section>

        <section className="px-4 pt-7">
          <div className="flex items-end justify-between">
            <div>
              <p className="section-kicker">TODAY'S MATCH</p>
              <h2 className="mt-1 font-display text-xl font-semibold">今日赛事</h2>
            </div>
            <AppButton className="flex items-center gap-1 bg-transparent text-xs text-muted-foreground">全部赛事 <ChevronRight className="size-4" /></AppButton>
          </div>
          <div className="mt-3 overflow-hidden rounded-md border border-primary/40 bg-panel">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[11px]">
              <span className="flex items-center gap-2 font-semibold text-alert"><span className="size-1.5 animate-pulse rounded-full bg-alert" />报名中</span>
              <span className="text-muted-foreground">剩余 8 席</span>
            </div>
            <div className="flex items-center px-4 py-4">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-primary">09月22日 · 20:30</p>
                <h3 className="mt-1.5 text-base font-semibold">秋季德扑锦标赛</h3>
                <p className="mt-1 text-xs text-muted-foreground">快速赛 · 起始筹码 20,000</p>
              </div>
              <div className="border-l border-line pl-4 text-right">
                <p className="text-[10px] text-muted-foreground">奖励池</p>
                <p className="mt-1 font-display text-2xl font-semibold text-primary">¥8,800</p>
                <AppButton className="mt-2 rounded-sm bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground">立即报名</AppButton>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pt-7">
          <div className="flex items-end justify-between">
            <div><p className="section-kicker">HOUSE POUR</p><h2 className="mt-1 font-display text-xl font-semibold">今夜畅饮</h2></div>
            <AppButton className="flex items-center gap-1 bg-transparent text-xs text-muted-foreground">查看菜单 <ChevronRight className="size-4" /></AppButton>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Drink image={lagerImage} name="慕尼黑琥珀拉格" meta="500ml · 麦香清爽" price="32" />
            <Drink image={dunkelImage} name="巴伐利亚黑啤" meta="500ml · 焦香醇厚" price="38" />
          </div>
        </section>

        <section className="px-4 pt-7">
          <div className="rounded-md border border-line bg-member p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-full border border-primary/50 bg-background"><Crown className="size-5 text-primary" /></div><div><p className="text-sm font-semibold">晚上好，Alex</p><p className="mt-0.5 text-[11px] text-muted-foreground">黑金会员 · 距升级还差 360 积分</p></div></div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
            <div className="mt-4 grid grid-cols-3 border-y border-line py-3 text-center">
              <Asset icon={WalletCards} value="760.00" label="余额" />
              <Asset icon={Coins} value="1,280" label="游戏币" />
              <Asset icon={Gift} value="3,640" label="积分" />
            </div>
            <AppButton className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm border border-primary/40 bg-primary-soft py-2.5 text-xs font-semibold text-primary"><QrCode className="size-4" />出示会员核销码</AppButton>
          </div>
        </section>

        <nav className="fixed bottom-0 left-1/2 z-20 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-4 border-t border-line bg-nav px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
          <NavItem icon={House} label="首页" active />
          <NavItem icon={UtensilsCrossed} label="点单" />
          <NavItem icon={Trophy} label="赛事" />
          <NavItem icon={CircleUserRound} label="我的" />
        </nav>
      </div>
    </main>
  );
}

function Drink({ image, name, meta, price }: { image: string; name: string; meta: string; price: string }) {
  return <article className="overflow-hidden rounded-md border border-line bg-panel"><img src={image} alt={name} loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full object-cover" /><div className="p-3"><h3 className="truncate text-sm font-semibold">{name}</h3><p className="mt-1 text-[11px] text-muted-foreground">{meta}</p><div className="mt-3 flex items-center justify-between"><p className="font-display text-lg font-semibold text-primary"><span className="text-xs">¥</span>{price}</p><AppButton aria-label={`添加${name}`} className="grid size-7 place-items-center rounded-full bg-primary text-lg leading-none text-primary-foreground">+</AppButton></div></div></article>;
}

function Asset({ icon: Icon, value, label }: { icon: typeof Coins; value: string; label: string }) {
  return <div className="border-r border-line last:border-r-0"><Icon className="mx-auto size-4 text-primary" /><p className="mt-1.5 font-display text-lg font-semibold">{value}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{label}</p></div>;
}

function NavItem({ icon: Icon, label, active = false }: { icon: typeof House; label: string; active?: boolean }) {
  return <AppButton className={`flex flex-col items-center gap-1 bg-transparent ${active ? "text-primary" : "text-muted-foreground"}`}><Icon className="size-5" strokeWidth={active ? 2.2 : 1.7} /><span className="text-[11px] font-medium">{label}</span></AppButton>;
}