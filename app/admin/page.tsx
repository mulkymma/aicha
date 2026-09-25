"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Check,
  ChevronRight,
  Clock3,
  Edit3,
  MapPin,
  MessageSquare,
  Package,
  Plus,
  ShoppingBag,
  Store,
  Truck,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Order = {
  id: string;
  customer: string;
  branch: string;
  type: string;
  items: string;
  total: number;
  status: string;
  time: string;
  address?: string;
  seen?: boolean;
  deliveryPerson?: string;
  mpesaCode?: string;
  paymentStatus?: string;
};

const sampleOrders: Order[] = [
  {
    id: "#AIC-1048",
    customer: "Amina Mohamed",
    branch: "Nyali Branch",
    type: "Pickup",
    items: "Ai-Scream Sea Salt & Vanilla Mix × 2",
    total: 180,
    status: "New",
    time: "2 min ago",
  },
  {
    id: "#AIC-1047",
    customer: "Brian Otieno",
    branch: "Fontanella Branch",
    type: "Delivery",
    items: "Lemon Oolong × 1 · Ai-KA Latte × 1",
    total: 450,
    status: "Preparing",
    time: "12 min ago",
  },
  {
    id: "#AIC-1046",
    customer: "Sarah Wanjiku",
    branch: "Nyali Branch",
    type: "Pickup",
    items: "Strawberry Shake × 2",
    total: 500,
    status: "Ready",
    time: "25 min ago",
  },
  {
    id: "#AIC-1045",
    customer: "Kevin Mwangi",
    branch: "Fontanella Branch",
    type: "Delivery",
    items: "Passion Fruit Tea × 2",
    total: 500,
    status: "Completed",
    time: "41 min ago",
  },
];

const menuItems = [
  ["Ai-Scream Sea Salt", "Ai-Scream Series", "KSh 90", true],
  ["Ai-Scream Vanilla", "Ai-Scream Series", "KSh 90", true],
  ["Ai-Scream Sea Salt & Vanilla Mix", "Ai-Scream Series", "KSh 90", true],
  ["Ai-CHA Lemon Oolong", "Best Sellers", "KSh 200", true],
  ["Ai-KA Signature Latte", "Coffee", "KSh 250", true],
];

export default function AdminPage() {
  const [view, setView] = useState("Overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<Record<string, string>>(
    {},
  );
  const [menuVisible, setMenuVisible] = useState<Record<string, boolean>>({});
  const [notice, setNotice] = useState("");
  const [adminIdentity, setAdminIdentity] = useState({ name: "Admin", role: "staff", branch: "" });

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((response) => (response.ok ? response.json() : { orders: [] }))
      .then((result) => setOrders(result.orders))
      .catch(() => setOrders([]));
  }, []);

  useEffect(() => {
    fetch("/api/admin/me").then((response) => response.ok ? response.json() : null).then((result) => result && setAdminIdentity(result)).catch(() => undefined);
  }, []);

  const updateStatus = (id: string, status: string) => {
    setOrderStatuses((current) => ({ ...current, [id]: status }));
    fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setNotice(`${id} marked ${status.toLowerCase()}`);
    setTimeout(() => setNotice(""), 2200);
  };

  const verifyPayment = (
    id: string,
    paymentStatus: "Verified" | "Rejected",
  ) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === id ? { ...order, paymentStatus } : order,
      ),
    );
    fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, paymentStatus }),
    });
    setNotice(`${id} payment ${paymentStatus.toLowerCase()}`);
  };

  const assignDelivery = (id: string, deliveryPerson: string) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === id ? { ...order, seen: true, deliveryPerson } : order,
      ),
    );
    fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, seen: true, deliveryPerson }),
    });
    setNotice(`${id} assigned to ${deliveryPerson}`);
  };

  return (
    <main className="min-h-screen bg-[#fff5f1] text-[#38221d]">
      <header className="border-b border-[#eadbd1] bg-[#fffdf8] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#e9002b] text-lg font-bold text-white">
              A
            </div>
            <div>
              <p className="font-serif text-xl font-semibold leading-none">
                Ai-CHA admin
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[.2em] text-[#8f7167]">
                {adminIdentity.name} · {adminIdentity.role === "superadmin" ? "All branches" : adminIdentity.branch}
              </p>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-[#8f7167] sm:inline">
              Saturday, 19 September
            </span>
            <div className="flex size-9 items-center justify-center rounded-full bg-[#f7e5d8] text-sm font-semibold text-[#e9002b]">
              AN
            </div>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:py-8">
        <aside className="lg:w-56">
          <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col">
            {["Overview", "Orders", "Menu", "Feedback", "Branches"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setView(item)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${view === item ? "bg-[#e9002b] text-white shadow-lg shadow-[#e9002b]/15" : "text-[#765d55] hover:bg-[#f6e6dc]"}`}
                >
                  {item === "Overview" ? (
                    <Package />
                  ) : item === "Orders" ? (
                    <ShoppingBag />
                  ) : item === "Menu" ? (
                    <Store />
                  ) : item === "Feedback" ? (
                    <MessageSquare />
                  ) : (
                    <MapPin />
                  )}
                  {item}
                </button>
              ),
            )}
          </nav>
          <div className="mt-6 hidden rounded-2xl bg-[#f7e5d8] p-4 lg:block">
            <p className="text-xs font-bold uppercase tracking-wider text-[#e9002b]">
              Today&apos;s target
            </p>
            <p className="mt-2 font-serif text-2xl">KSh 12,000</p>
            <p className="mt-1 text-xs text-[#8f7167]">72% of daily goal</p>
            <div className="mt-3 h-2 rounded-full bg-white">
              <div className="h-2 w-[72%] rounded-full bg-[#f5a623]" />
            </div>
          </div>
        </aside>
        <section className="min-w-0 flex-1">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#f5a623]">
                Good afternoon, Aicha
              </p>
              <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
                {view}
              </h1>
            </div>
            <Button
              onClick={() => setNotice("New menu item form is ready")}
              className="rounded-full bg-[#e9002b] text-white hover:bg-[#b80022]"
            >
              <Plus data-icon="inline-start" /> Add new item
            </Button>
          </div>
          {notice && (
            <div className="mb-5 rounded-xl border border-[#f3c878] bg-[#fff1c9] px-4 py-3 text-sm font-semibold text-[#765018]">
              {notice}
            </div>
          )}
          {view === "Overview" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {(
                  [
                    ["Today&apos;s sales", "KSh 8,640", "+18.4%", ShoppingBag],
                    ["Open orders", "12", "4 need action", Clock3],
                    ["Delivery orders", "7", "58% of orders", Truck],
                    ["Feedback score", "4.8/5", "32 responses", MessageSquare],
                  ] as [string, string, string, typeof ShoppingBag][]
                ).map(([label, value, detail, Icon]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-[#eadbd1] bg-[#fffdf8] p-5"
                  >
                    <div className="flex items-center justify-between">
                      <p
                        className="text-sm text-[#8f7167]"
                        dangerouslySetInnerHTML={{ __html: label }}
                      />
                      <div className="flex size-9 items-center justify-center rounded-xl bg-[#f7e5d8] text-[#e9002b]">
                        <Icon />
                      </div>
                    </div>
                    <p className="mt-5 font-serif text-3xl">{value}</p>
                    <p className="mt-1 text-xs font-semibold text-[#6f806d]">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_.8fr]">
                <OrdersCard
                  orders={orders.slice(0, 3)}
                  orderStatuses={orderStatuses}
                  updateStatus={updateStatus}
                  verifyPayment={verifyPayment}
                  assignDelivery={assignDelivery}
                />
                <div className="rounded-2xl border border-[#eadbd1] bg-[#fffdf8] p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl">Branches</h2>
                    <button
                      onClick={() => setView("Branches")}
                      className="text-xs font-bold text-[#e9002b]"
                    >
                      Manage
                    </button>
                  </div>
                  <BranchRow
                    name="Nyali Branch"
                    phone="0116664295"
                    orders="7 orders today"
                  />
                  <BranchRow
                    name="Fontanella Branch"
                    phone="0116664297"
                    orders="5 orders today"
                  />
                </div>
              </div>
            </>
          )}
          {view === "Orders" && (
            <OrdersCard
              orders={orders}
              orderStatuses={orderStatuses}
              updateStatus={updateStatus}
              verifyPayment={verifyPayment}
              assignDelivery={assignDelivery}
            />
          )}
          {view === "Menu" && (
            <div className="rounded-2xl border border-[#eadbd1] bg-[#fffdf8] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl">Menu items</h2>
                  <p className="mt-1 text-sm text-[#8f7167]">
                    Control what customers can order today.
                  </p>
                </div>
                <Button
                  onClick={() => setNotice("New menu item form is ready")}
                  className="rounded-full bg-[#f5a623] text-white"
                >
                  <Plus />
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                {menuItems.map(([name, category, price, enabled]) => {
                  const visible = menuVisible[String(name)] ?? Boolean(enabled);
                  return (
                    <div
                      key={String(name)}
                      className="flex items-center justify-between gap-3 rounded-xl border border-[#eee2d9] p-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Image
                          src="/aicha%20drink.png"
                          alt=""
                          width={36}
                          height={48}
                          className="h-12 w-9 shrink-0 object-contain"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{name}</p>
                          <p className="mt-1 text-xs text-[#8f7167]">
                            {category} · {price}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setNotice(`Editing ${name}`)}
                          className="rounded-lg p-2 text-[#8f7167] hover:bg-[#f7e5d8]"
                          aria-label={`Edit ${name}`}
                        >
                          <Edit3 />
                        </button>
                        <button
                          onClick={() =>
                            setMenuVisible((current) => ({
                              ...current,
                              [String(name)]: !visible,
                            }))
                          }
                          className={`rounded-full px-3 py-1.5 text-xs font-bold ${visible ? "bg-[#dff0df] text-[#4d754d]" : "bg-[#f4d9d5] text-[#a04b42]"}`}
                        >
                          {visible ? "Live" : "Hidden"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {view === "Feedback" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#eadbd1] bg-[#fffdf8] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#f5a623]">
                  Customer pulse
                </p>
                <p className="mt-3 font-serif text-5xl">4.8</p>
                <p className="mt-1 text-sm text-[#8f7167]">
                  Average rating from 32 responses
                </p>
                <div className="mt-6 h-3 rounded-full bg-[#f2e4dc]">
                  <div className="h-3 w-[96%] rounded-full bg-[#f5a623]" />
                </div>
              </div>
              <div className="rounded-2xl border border-[#eadbd1] bg-[#fffdf8] p-5">
                <p className="font-serif text-2xl">Recent feedback</p>
                <div className="mt-5 flex flex-col gap-4 text-sm">
                  <p className="border-b border-[#eee2d9] pb-3">
                    “The sea salt and vanilla mix is amazing.”
                    <span className="mt-1 block text-xs text-[#8f7167]">
                      Nyali · 5 stars
                    </span>
                  </p>
                  <p>
                    “Fast delivery and lovely packaging.”
                    <span className="mt-1 block text-xs text-[#8f7167]">
                      Fontanella · 5 stars
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
          {view === "Branches" && (
            <div className="grid gap-4 md:grid-cols-2">
              <BranchPanel
                name="Nyali Branch"
                phone="0116664295"
                email="aichafontanella@gmail.com"
              />
              <BranchPanel
                name="Fontanella Branch"
                phone="0116664297"
                email="aichafontanella@gmail.com"
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function OrdersCard({
  orders,
  orderStatuses,
  updateStatus,
  verifyPayment,
  assignDelivery,
}: {
  orders: Order[];
  orderStatuses: Record<string, string>;
  updateStatus: (id: string, status: string) => void;
  verifyPayment?: (id: string, paymentStatus: "Verified" | "Rejected") => void;
  assignDelivery?: (id: string, deliveryPerson: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-[#eadbd1] bg-[#fffdf8] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl">Branch orders</h2>
          <p className="mt-1 text-sm text-[#8f7167]">
            Verify M-Pesa before preparing each order.
          </p>
        </div>
        <span className="rounded-full bg-[#f7e5d8] px-3 py-1 text-xs font-bold text-[#e9002b]">
          {orders.length} shown
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {orders.map((order) => {
          const status = orderStatuses[order.id] ?? order.status;
          return (
            <div
              key={order.id}
              className="rounded-xl border border-[#eee2d9] p-4"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-[#e9002b]">{order.id}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${status === "Completed" ? "bg-[#dff0df] text-[#4d754d]" : status === "Ready" ? "bg-[#fff1c9] text-[#765018]" : "bg-[#f7e5d8] text-[#a24c37]"}`}
                    >
                      {status}
                    </span>
                  </div>
                  <p className="mt-2 font-semibold">{order.customer}</p>
                  <p className="mt-1 text-xs leading-5 text-[#8f7167]">
                    {order.items}
                  </p>
                  <p className="mt-2 flex flex-wrap gap-3 text-xs text-[#8f7167]">
                    <span className="inline-flex items-center gap-1">
                      <MapPin />
                      {order.branch}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      {order.type === "Delivery" ? <Truck /> : <Store />}
                      {order.type}
                    </span>
                    <span>{order.time}</span>
                  </p>
                  <p className="mt-2 text-xs font-semibold text-[#765018]">
                    M-Pesa: {order.mpesaCode || "Not provided"} ·{" "}
                    {order.paymentStatus || "Pending verification"}
                  </p>
                  <p className="mt-1 text-xs text-[#8f7167]">
                    Delivery address: {order.address || "Pickup at branch"}
                  </p>
                  <p className="mt-1 text-xs text-[#8f7167]">
                    Delivery person: {order.deliveryPerson || "Not assigned"}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <strong className="font-serif text-xl">
                    KSh {order.total}
                  </strong>
                  <div className="flex flex-wrap justify-end gap-2">
                    {order.paymentStatus !== "Verified" && verifyPayment && (
                      <button
                        onClick={() => verifyPayment(order.id, "Verified")}
                        className="rounded-full bg-[#4d754d] px-3 py-2 text-xs font-bold text-white"
                      >
                        Verify payment
                      </button>
                    )}
                    {order.paymentStatus !== "Rejected" &&
                      order.paymentStatus !== "Verified" &&
                      verifyPayment && (
                        <button
                          onClick={() => verifyPayment(order.id, "Rejected")}
                          className="rounded-full border border-[#b0443b] px-3 py-2 text-xs font-bold text-[#b0443b]"
                        >
                          Reject
                        </button>
                      )}
                    {assignDelivery && order.type === "Delivery" && (
                      <select
                        defaultValue={order.deliveryPerson || ""}
                        onChange={(event) => event.target.value && assignDelivery(order.id, event.target.value)}
                        className="rounded-full border border-[#d9d0c0] bg-[#fffdf8] px-3 py-2 text-xs font-semibold text-[#765d55]"
                      >
                        <option value="">Assign delivery</option>
                        <option value="Nyali rider">Nyali rider</option>
                        <option value="Fontanella rider">Fontanella rider</option>
                      </select>
                    )}
                    {status !== "Completed" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            order.id,
                            status === "New"
                              ? "Preparing"
                              : status === "Preparing"
                                ? "Ready"
                                : "Completed",
                          )
                        }
                        className="inline-flex items-center gap-1 rounded-full bg-[#e9002b] px-3 py-2 text-xs font-bold text-white"
                      >
                        {status === "Ready" ? "Complete" : "Advance"}
                        <ChevronRight />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BranchRow({
  name,
  phone,
  orders,
}: {
  name: string;
  phone: string;
  orders: string;
}) {
  return (
    <div className="mt-5 flex items-center justify-between gap-3 border-b border-[#eee2d9] pb-4 last:border-0">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="mt-1 text-xs text-[#8f7167]">
          {phone} · {orders}
        </p>
      </div>
      <span className="size-2 rounded-full bg-[#67a867]" />
    </div>
  );
}
function BranchPanel({
  name,
  phone,
  email,
}: {
  name: string;
  phone: string;
  email: string;
}) {
  return (
    <div className="rounded-2xl border border-[#eadbd1] bg-[#fffdf8] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#f5a623]">
            Active branch
          </p>
          <h2 className="mt-2 font-serif text-2xl">{name}</h2>
        </div>
        <button
          className="rounded-lg p-2 text-[#8f7167] hover:bg-[#f7e5d8]"
          aria-label={`Edit ${name}`}
        >
          <Edit3 />
        </button>
      </div>
      <div className="mt-6 flex flex-col gap-3 text-sm text-[#765d55]">
        <p className="flex items-center gap-2">
          <MapPin /> Mombasa, Kenya
        </p>
        <p className="flex items-center gap-2">
          <Users /> {phone}
        </p>
        <p className="flex items-center gap-2">
          <MessageSquare /> {email}
        </p>
        <p className="flex items-center gap-2">
          <Clock3 /> Open daily, 8am — 9pm
        </p>
      </div>
    </div>
  );
}
