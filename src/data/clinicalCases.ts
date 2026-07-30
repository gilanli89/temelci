export type ClinicalCase = {
  id: string;
  title: string;
  description: string;
  before_image: string;
  after_image?: string;
  before_alt: string;
  after_alt?: string;
};

export const clinicalCases: ClinicalCase[] = [
  {
    id: "client-full-mouth-rehabilitation",
    title: "Full-mouth rehabilitation",
    description: "A documented multi-stage restorative case completed at Temelci Dental.",
    before_image: "/clinical-cases/client-full-mouth-rehabilitation.webp",
    before_alt: "Documented stages of a full-mouth dental rehabilitation",
  },
  {
    id: "client-smile-restoration",
    title: "Smile restoration",
    description: "Before-and-after clinical photographs supplied by the clinic.",
    before_image: "/clinical-cases/client-smile-restoration.webp",
    before_alt: "Before and after smile restoration at Temelci Dental",
  },
  {
    id: "client-implant-rehabilitation",
    title: "Implant-supported rehabilitation",
    description: "Documented clinical result following an implant-supported restorative plan.",
    before_image: "/clinical-cases/client-implant-rehabilitation.webp",
    before_alt: "Before and after implant-supported dental rehabilitation",
  },
  {
    id: "client-smile-design",
    title: "Aesthetic smile design",
    description: "A documented aesthetic smile-design result.",
    before_image: "/clinical-cases/client-smile-design.webp",
    before_alt: "Documented aesthetic smile-design result",
  },
  {
    id: "client-crown-rehabilitation",
    title: "Crown rehabilitation",
    description: "Before-and-after clinical photographs of a crown rehabilitation.",
    before_image: "/clinical-cases/client-crown-rehabilitation.webp",
    before_alt: "Before and after crown rehabilitation at Temelci Dental",
  },
  ...Array.from({ length: 10 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      id: `archive-smile-${number}`,
      title: "Documented patient result",
      description: "Clinical case from the Temelci Dental archive.",
      before_image: `/clinical-cases/archive-smile-${number}.webp`,
      before_alt: "Documented dental treatment result from the Temelci Dental clinical archive",
    };
  }),
  {
    id: "archive-smile-11",
    title: "Restorative smile treatment",
    description: "Clinical before-and-after photographs from the Temelci Dental archive.",
    before_image: "/clinical-cases/archive-before-11.webp",
    after_image: "/clinical-cases/archive-after-11.webp",
    before_alt: "Before restorative smile treatment",
    after_alt: "After restorative smile treatment",
  },
];
