import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import CtaButtons from "../components/CtaButtons";
import { seoConfig } from "../data/seoConfig";
import { localBusinessSchema, breadcrumbSchema } from "../data/schema";

const services = [
  { name: "Taxi Service in Una", path: "/taxi-service-una", desc: "Local and outstation taxi bookings in Una." },
  { name: "Taxi Service in Amb", path: "/taxi-service-amb", desc: "Local and outstation taxi bookings in Amb." },
  { name: "Amb Andaura Railway Station Taxi", path: "/amb-andaura-railway-station-taxi", desc: "Pickup and drop at Amb Andaura Railway Station." },
  { name: "Outstation Taxi", path: "/outstation-taxi", desc: "Outstation taxi service from Una to Himachal and neighbouring states." },
  { name: "Airport Transfers", path: "/airport-transfers", desc: "Airport taxi and transfer service from Una." },
];

export default function TaxiServices() {
  const seo = seoConfig.taxiServices;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Taxi Services" }];
  return (
    <Layout>
      <SEO
        path={seo.path}
        title={seo.title}
        description={seo.description}
        structuredData={[localBusinessSchema(), breadcrumbSchema(crumbs)]}
      />
      <Breadcrumbs items={crumbs} />
      <section className="max-w-[1240px] mx-auto px-margin py-space-xl flex flex-col gap-space-lg">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="font-headline-xl font-bold">Taxi Services in Una</h1>
          <p className="text-body-lg text-on-surface-variant">
            Mandyal Tour &amp; Travel provides local and outstation taxi services from Una, Himachal
            Pradesh, including railway and airport transfers and travel across the wider Himachal
            region. Choose the service that matches your journey below.
          </p>
        </div>
        <CtaButtons whatsappMessage="Hello Mandyal Tour and Travels, I need a cab quote" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-lg pt-space-md">
          {services.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              className="group flex items-center justify-between p-6 rounded-2xl bg-surface-container shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <h2 className="font-headline-sm font-bold group-hover:text-primary transition-colors">{s.name}</h2>
                <p className="text-body-sm text-on-surface-variant">{s.desc}</p>
              </div>
              <span aria-hidden="true" className="text-primary">&rarr;</span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
