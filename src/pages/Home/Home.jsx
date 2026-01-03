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
    <div className="space-y-16 pb-10">
      <Helmet><title>Import Export Hub • Home</title></Helmet>

      {/* --- EXISTING SECTION: HERO SLIDER --- */}
      <section className="rounded-xl overflow-hidden shadow-lg">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-10 left-6 md:left-12 text-white max-w-lg">
                  <h2 className="text-3xl md:text-5xl font-bold mb-2">Worldwide Products, Imported in One Click</h2>
                  <p className="opacity-90 text-lg">Explore the newest export products from across the globe seamlessly.</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* --- NEW SECTION 1: POPULAR CATEGORIES --- */}
      <section>
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold">Browse by Category</h3>
          <p className="text-gray-500 mt-2">Find exactly what you need for your business</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Electronics", img: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Arduino_ftdi_chip-1.jpg" },
            { name: "Textiles", img: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&w=600&q=80" },
            { name: "Agriculture", img: "https://cdn.prod.website-files.com/66604a97df59732aab43fcc8/674882e6935eaaad6bdf3fb7_post-23.webp" },
            { name: "Machinery", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" }
          ].map((cat, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-xl cursor-pointer h-40">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <span className="text-white font-bold text-xl">{cat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- NEW SECTION 2: SERVICES --- */}
      <section className="bg-base-200 p-8 rounded-2xl">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold">Our Services</h3>
          <p className="text-gray-500">Comprehensive solutions for global trade</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Global Logistics", desc: "Door-to-door delivery with real-time tracking.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /> },
            { title: "Customs Clearance", desc: "Hassle-free documentation and compliance.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
            { title: "Secure Payments", desc: "Escrow services to protect both buyers and sellers.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /> }
          ].map((srv, idx) => (
            <div key={idx} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body items-center text-center">
                <div className="p-3 bg-primary/10 text-primary rounded-full mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">{srv.icon}</svg>
                </div>
                <h4 className="card-title">{srv.title}</h4>
                <p className="text-sm text-gray-500">{srv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- EXISTING SECTION: LATEST PRODUCTS --- */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <h3 className="text-3xl font-bold">Latest Arrivals</h3>
          <a className="btn btn-outline btn-sm" href="/products">View All Products</a>
        </div>
        {loading ? (
          <div className="min-h-[200px] grid place-items-center"><span className="loading loading-spinner loading-lg" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map(p => <ProductCard key={p._id} product={p} />)}
            {latest.length === 0 && <div className="opacity-70 col-span-full text-center py-10">No products yet. Be the first to add one!</div>}
          </div>
        )}
      </section>

      {/* --- NEW SECTION 3: FEATURED HIGHLIGHT (Design variation) --- */}
      <section className="card lg:card-side bg-base-100 shadow-xl overflow-hidden border border-base-200">
        <figure className="lg:w-1/2 relative">
          <img src="https://www.ethicalconsumer.org/sites/default/files/styles/primary_image_xlarge/public/images/2018-05/coffee%20beans%20ethical%20shopping%20guide.jpg?h=c3635fa2&itok=Oj0_4Si3" alt="Shipping" className="w-full h-full object-cover" />
          {/* <div className="absolute top-4 left-4 badge badge-secondary p-3">Trending Now</div> */}
        </figure>
        <div className="card-body lg:w-1/2 flex flex-col justify-center">
          <h2 className="card-title text-3xl mb-4">Export Quality Organic Coffee</h2>
          <p className="flex-grow-0 mb-4">Sourced directly from the highlands of South America. Our premium beans are roasted to perfection and ready for international shipping. Bulk orders receive a 15% discount this month.</p>
          <div className="stats shadow mb-6 bg-base-200">
            <div className="stat place-items-center">
              <div className="stat-title">Min Order</div>
              <div className="stat-value text-primary text-2xl">500kg</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Origin</div>
              <div className="stat-value text-secondary text-2xl">Brazil</div>
            </div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Request Quote</button>
          </div>
        </div>
      </section>

      {/* --- EXISTING SECTION: INFO CARDS --- */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="card bg-base-200 border-l-4 border-blue-600">
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Live Synchronization
            </h3>
            <p>Your imports and exports are instantly updated to match the database in real time, ensuring zero latency in stock management.</p>
          </div>
        </div>
        <div className="card bg-base-200 border-l-4 border-green-600">
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Secure & Private
            </h3>
            <p>We use Firebase Authentication and military-grade encryption to keep your transaction data and personal details strictly private.</p>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 4: HOW IT WORKS --- */}
      <section className="py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-gray-500">Simple steps to start trading globally</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {[
            { step: "01", title: "Register", text: "Create your verified business account." },
            { step: "02", title: "List/Browse", text: "Post your products or search the catalog." },
            { step: "03", title: "Connect", text: "Chat with verified traders directly." },
            { step: "04", title: "Trade", text: "Complete transactions securely." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center max-w-xs">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                {item.step}
              </div>
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.text}</p>
              {i !== 3 && <div className="hidden md:block w-24 h-0.5 bg-gray-300 absolute transform translate-x-24 mt-8 -z-10"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* --- EXISTING SECTION: STATS --- */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="stats shadow border border-base-200">
          <div className="stat">
            <div className="stat-figure text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            </div>
            <div className="text-blue-800 stat-title">Products</div>
            <div className="stat-value">50k+</div>
            <div className="stat-desc text-blue-800">Handpicked Worldwide</div>
          </div>
        </div>
        <div className="stats shadow border border-base-200">
          <div className="stat">
            <div className="stat-figure text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div className="text-blue-800 stat-title">Speed</div>
            <div className="stat-value">Instant</div>
            <div className="stat-desc text-blue-800">One-Click Import</div>
          </div>
        </div>
        <div className="stats shadow border border-base-200">
          <div className="stat">
            <div className="stat-figure text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <div className="text-blue-800 stat-title">Exporters</div>
            <div className="stat-value">1,200+</div>
            <div className="stat-desc text-blue-800">Verified Sellers</div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 5: TRUSTED PARTNERS --- */}
      <section className="py-6 border-y border-base-200">
        <p className="text-center font-semibold text-gray-400 mb-4 uppercase tracking-widest text-sm">Trusted by Industry Leaders</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
            {/* Using text placeholders for logos to avoid broken links, styled like logos */}
            <div className="text-2xl font-black font-serif">MAERSK</div>
            <div className="text-2xl font-bold font-mono">FedEx</div>
            <div className="text-2xl font-extrabold italic">DHL</div>
            <div className="text-2xl font-bold">ALIBABA</div>
            <div className="text-2xl font-black text-blue-900">MSC</div>
        </div>
      </section>

      {/* --- NEW SECTION 6: TESTIMONIALS --- */}
      <section className="bg-base-200/50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold text-center mb-8">What Traders Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Sarah J.", role: "Importer, UK", text: "The live sync feature saved me hours of inventory management. Highly recommended!" },
            { name: "Ahmed K.", role: "Exporter, UAE", text: "Finally a platform that makes documentation easy. My sales increased by 40%." },
            { name: "Carlos M.", role: "Logistics, Spain", text: "Secure payments gave me the peace of mind to deal with new international suppliers." }
          ].map((t, i) => (
            <div key={i} className="card bg-base-100 shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-12">
                    <span className="text-xl">{t.name.charAt(0)}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="italic text-gray-600">"{t.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- NEW SECTION 7: LATEST NEWS / BLOG --- */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-3xl font-bold">Industry Insights</h3>
          <a href="#" className="link link-primary no-underline">Read Blog &rarr;</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
             { title: "2024 Trade Regulations Update", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=60" },
             { title: "Top 5 Emerging Markets for Tech", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=60" },
             { title: "Sustainable Shipping Practices", img: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=500&q=60" }
          ].map((blog, i) => (
            <div key={i} className="card bg-base-100 shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
              <figure className="h-48">
                <img src={blog.img} alt="Blog" className="w-full h-full object-cover" />
              </figure>
              <div className="card-body p-5">
                <div className="badge badge-ghost mb-2">News</div>
                <h4 className="card-title text-lg">{blog.title}</h4>
                <p className="text-sm text-gray-500">Learn about the latest trends impacting global trade logistics...</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- NEW SECTION 8: FAQ --- */}
      <section className="max-w-4xl mx-auto w-full">
        <h3 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h3>
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked /> 
            <div className="collapse-title text-xl font-medium">How do I verify a supplier?</div>
            <div className="collapse-content"> 
              <p>All suppliers on our platform undergo a rigorous 3-step verification process including business license validation and physical site inspection.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" /> 
            <div className="collapse-title text-xl font-medium">What are the shipping costs?</div>
            <div className="collapse-content"> 
              <p>Shipping costs vary by weight, dimension, and destination. Use our built-in calculator on the product page for instant estimates.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" /> 
            <div className="collapse-title text-xl font-medium">Is my payment secure?</div>
            <div className="collapse-content"> 
              <p>Yes, we use an Escrow system. Funds are only released to the seller once you confirm receipt of goods in satisfactory condition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 9: NEWSLETTER --- */}
      <section className="bg-primary text-primary-content rounded-2xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold mb-2">Stay Updated</h3>
            <p className="opacity-90">Get the latest market trends and daily deals sent directly to your inbox. No spam, ever.</p>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="join w-full">
              <input className="input input-bordered join-item w-full text-black" placeholder="Enter your email" />
              <button className="btn btn-secondary join-item">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 10: CALL TO ACTION (CTA) --- */}
      <section className="relative rounded-2xl overflow-hidden py-20 text-center">
        <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80" alt="CTA Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gray-900/80"></div>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Expand Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">Join 10,000+ traders maximizing their potential with Import Export Hub.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg">Get Started Free</button>
            <button className="btn btn-outline btn-lg text-white hover:bg-white hover:text-black">Contact Sales</button>
          </div>
        </div>
      </section>

    </div>
  );
}