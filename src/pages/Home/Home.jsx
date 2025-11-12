import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../lib/api";
import ProductCard from "../../components/ProductCard";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.png";

export default function Home() {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios.get(`${API_BASE}/products/latest`).then(res => {
      if (mounted) setLatest(res.data || []);
    }).finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <div className="space-y-10">
      <Helmet><title>Import Export Hub • Home</title></Helmet>

      <section className="rounded-xl overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="rounded-xl"
        >
          {[img1, img2, img3].map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative">
                <img src={src} alt={`Banner ${i + 1}`} className="w-full max-h-[420px] object-cover" />
                <div className="absolute inset-0  from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold">Worldwide Products, Imported in One Click
</h2>
                  <p className="opacity-90">Explore the newest export products from across the globe.
</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section>
        <div className="flex items-end justify-between mb-4">
          <h3 className="text-2xl font-semibold">Latest Products</h3>
          <a className="btn btn-outline btn-sm" href="/products">View All</a>
        </div>
        {loading ? (
          <div className="min-h-[200px] grid place-items-center"><span className="loading loading-spinner loading-lg" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latest.map(p => <ProductCard key={p._id} product={p} />)}
            {latest.length === 0 && <div className="opacity-70">No products yet. Be the first to add one!</div>}
          </div>
        )}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Real-time Sync</h3>
            <p>Your imports and exports stay in sync with the database instantly.</p>
          </div>
        </div>
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Secure & Private</h3>
            <p>We use Firebase Authentication to keep your data secure.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="stats shadow">
          <div className="stat">
            <div className="text-blue-800">Products</div>
            <div className="stat-value">Global</div>
            <div className="text-blue-800">Browse curated catalog</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="text-blue-800">One-Click Import</div>
            <div className="stat-value">Fast</div>
            <div className=" text-blue-800">Import with confidence</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="text-blue-800">Exporters</div>
            <div className="stat-value">Empowered</div>
            <div className="text-blue-800">Manage your listings</div>
          </div>
        </div>
      </section>
    </div>
  );
}


