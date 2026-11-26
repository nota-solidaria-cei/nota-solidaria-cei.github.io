import { Heart, HeartHandshake, ReceiptText, Store, type LucideIcon } from 'lucide-react';
import { AboutSection } from './components/AboutSection';
import { DonationCards } from './components/DonationCards';
import { DonationTutorial } from './components/DonationTutorial';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ImpactStats } from './components/ImpactStats';
import { MerchantSection } from './components/MerchantSection';
import { Modal, type Tone } from './components/Modal';
import { PhotoGallery } from './components/PhotoGallery';
import { PhysicalDonation } from './components/PhysicalDonation';
import { PixDonation } from './components/PixDonation';
import { ShareCampaign } from './components/ShareCampaign';
import { SocialImpact } from './components/SocialImpact';
import { usePanelRoute, type PanelId } from './hooks/usePanelRoute';

const PANELS: Record<PanelId, { title: string; subtitle: string; icon: LucideIcon; tone: Tone }> = {
  tutorial: {
    title: 'Ative sua doação automática',
    subtitle: 'Cadastre uma vez. Ajude sempre.',
    icon: HeartHandshake,
    tone: 'auto',
  },
  notas: { title: 'Doe suas notas', subtitle: 'Notas e cupons sem CPF também ajudam.', icon: ReceiptText, tone: 'notes' },
  parceiro: { title: 'Tenho um comércio', subtitle: 'Faça parte dessa corrente de solidariedade.', icon: Store, tone: 'merchant' },
  pix: { title: 'Outras formas de ajudar', subtitle: 'Doação direta à instituição via Pix.', icon: Heart, tone: 'more' },
};

export default function App() {
  const { panel, open, close } = usePanelRoute();
  const cfg = panel ? PANELS[panel] : PANELS.tutorial;

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Hero />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <ImpactStats />
        <DonationCards onOpen={open} />
        <SocialImpact />
        <AboutSection />
        <PhotoGallery />
        <FAQ />
        <ShareCampaign />
      </main>
      <Footer />

      <Modal
        open={panel !== null}
        onClose={close}
        title={cfg.title}
        subtitle={cfg.subtitle}
        icon={cfg.icon}
        tone={cfg.tone}
        contentKey={panel ?? ''}
      >
        {panel === 'tutorial' && <DonationTutorial onClose={close} />}
        {panel === 'notas' && <PhysicalDonation onOpenTutorial={() => open('tutorial')} />}
        {panel === 'parceiro' && <MerchantSection />}
        {panel === 'pix' && <PixDonation onOpenTutorial={() => open('tutorial')} />}
      </Modal>
    </>
  );
}
