import ModalProvider from "@/components/ModalProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StudentTool from "@/components/StudentTool";
import HowItWorks from "@/components/HowItWorks";
import WhoItHelps from "@/components/WhoItHelps";
import UniversityPilot from "@/components/UniversityPilot";
import WorkshopSection from "@/components/WorkshopSection";
import InsightsSection from "@/components/InsightsSection";
import UniversityBuyerDemo from "@/components/UniversityBuyerDemo";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    // ModalProvider lets any button (pilot, workshop, pricing) open the shared
    // request modal from anywhere in the tree.
    <ModalProvider>
      <Navbar />
      <main>
        <Hero />
        <StudentTool />
        <HowItWorks />
        <WhoItHelps />
        <UniversityPilot />
        <WorkshopSection />
        <InsightsSection />
        <UniversityBuyerDemo />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </ModalProvider>
  );
}
