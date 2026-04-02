const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Header, Footer,
  AlignmentType, LevelFormat, PageBreak, PageNumber,
  HeadingLevel, TableOfContents
} = require("docx");

const F = "Liberation Serif";
const SZ = 24; // 12pt
const TEAM = "TEAM-ALC-2026";

// Paragraph counter for sequential numbering
let paraNum = 0;

// ═══════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════

function spacer(n) {
  return new Paragraph({ spacing: { before: n * 200 }, children: [] });
}

function center(text, size, bold) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [new TextRun({ text, font: F, size, bold })]
  });
}

// Numbered paragraph — the core of the brief
function p(text) {
  paraNum++;
  return new Paragraph({
    spacing: { after: 160 },
    alignment: AlignmentType.JUSTIFIED,
    indent: { left: 480 },
    children: [
      new TextRun({ text: `${paraNum}.\t`, font: F, size: SZ, bold: true }),
      new TextRun({ text, font: F, size: SZ })
    ]
  });
}

// Numbered paragraph with mixed runs (bold case names, italics, etc.)
function pm(runs) {
  paraNum++;
  return new Paragraph({
    spacing: { after: 160 },
    alignment: AlignmentType.JUSTIFIED,
    indent: { left: 480 },
    children: [
      new TextRun({ text: `${paraNum}.\t`, font: F, size: SZ, bold: true }),
      ...runs
    ]
  });
}

function t(text) { return new TextRun({ text, font: F, size: SZ }); }
function b(text) { return new TextRun({ text, font: F, size: SZ, bold: true }); }
function it(text) { return new TextRun({ text, font: F, size: SZ, italics: true }); }
function bi(text) { return new TextRun({ text, font: F, size: SZ, bold: true, italics: true }); }

function conclusion(text) {
  return new Paragraph({
    numbering: { reference: "conclusions", level: 0 },
    spacing: { after: 140 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: F, size: SZ })]
  });
}

function refHead(text) {
  return new Paragraph({
    spacing: { before: 240, after: 80 },
    children: [new TextRun({ text, font: F, size: SZ, bold: true, italics: true })]
  });
}

function ref(text) {
  return new Paragraph({
    spacing: { after: 60 },
    indent: { left: 360, hanging: 360 },
    children: [new TextRun({ text, font: F, size: 22 })]
  });
}

// ═══════════════════════════════════════════════════
// TITLE PAGE
// ═══════════════════════════════════════════════════

const titlePage = [
  spacer(8),
  center("WRITING ALCHEMY MOOT COURT 2026", 30, true),
  spacer(1),
  center("_______________", 24, false),
  spacer(2),
  center("WRITTEN SUBMISSIONS", 28, true),
  center("ON BEHALF OF SCRIPTUM", 28, true),
  center("(APPLICANT)", 26, false),
  spacer(4),
  center(TEAM, 24, true),
];

// ═══════════════════════════════════════════════════
// TABLE OF CONTENTS PAGE
// ═══════════════════════════════════════════════════

const tocPage = [
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { after: 300 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "TABLE OF CONTENTS", font: F, size: 26, bold: true })]
  }),
  new TableOfContents("Table of Contents", {
    hyperlink: true,
    headingStyleRange: "1-2",
  }),
];

// ═══════════════════════════════════════════════════
// MAIN ARGUMENTATION
// ═══════════════════════════════════════════════════

// H1 = main sections (I, II, III...), H2 = sub-sections (A, B, C...)
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, font: F, size: 26, bold: true })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, font: F, size: SZ, bold: true, italics: true })]
  });
}

const mainArg = [

  // ═══════════════════════ I. INTRODUCTION ═══════════════════════

  h1("I. Introduction"),

  p("SCRIPTUM respectfully submits that the Scriptorian Data Protection Authority (\u2018the DPA\u2019) erred in its decision of 12 February 2026, and that the preliminary reference questions should be answered in SCRIPTUM\u2019s favour."),

  pm([
    t("SCRIPTUM is a non-profit educational organisation founded in 2021 whose mission is to train professionals \u2014 lawyers, medical practitioners, financial analysts, and engineers \u2014 in working with large language models. On 15 October 2025, SCRIPTUM held an event at the Scriptorian National University of Law during which 312 participants used the Crucible, an optional web-based training tool, and 312 of them subsequently became Adepts by voluntarily sharing their results on professional networks. The DPA\u2019s decision treats SCRIPTUM\u2019s educational activities as if they were commercial data exploitation, without due regard for the non-commercial, public-interest character of those activities or for the fundamental rights engaged."),
  ]),

  p("These submissions are structured according to the four questions referred to the Court of Justice. SCRIPTUM addresses each question in turn, beginning with the definition of personal data (Question 1), proceeding to the scope of the AI Act (Question 2), then to the proportionality of GDPR restrictions under the Charter (Question 3), and concluding with the validity of consent (Question 4)."),

  // ═══════════ II. QUESTION 1: PERSONAL DATA ═══════════

  h1("II. Question 1: Textual Prompts Do Not Constitute Personal Data Per Se"),

  h2("A. The statutory definition requires information \u2018relating to\u2019 an identified person"),

  pm([
    t("Article 4(1) GDPR defines \u2018personal data\u2019 as \u2018any information relating to an identified or identifiable natural person.\u2019 The definition contains four cumulative elements: the information must (i) constitute \u2018any information,\u2019 (ii) \u2018relate to,\u2019 (iii) an \u2018identified or identifiable,\u2019 (iv) \u2018natural person.\u2019 The Article 29 Working Party\u2019s "),
    bi("Opinion 4/2007 on the Concept of Personal Data"),
    t(" elaborated that information \u2018relates to\u2019 a person where a content element, a purpose element, or a result element is present. Where none of these elements is satisfied, the data does not fall within the definition, regardless of who created it."),
  ]),

  p("SCRIPTUM does not dispute that prompts may, in specific instances, contain personal data \u2014 for example, where a user types a client\u2019s name or a patient\u2019s diagnosis into the Crucible. However, it submits that the prompt as such \u2014 as a functional textual instruction addressed to a machine \u2014 does not automatically satisfy the \u2018relating to\u2019 requirement. A prompt such as \u2018Draft a claim for the protection of personal data\u2019 contains no information about any natural person; it is an operational command."),

  h2("B. The Nowak content-purpose-effect test is not satisfied"),

  pm([
    t("In "),
    b("Nowak"),
    t(" (C-434/16), the Court held that written examination answers constituted personal data because they existed specifically to evaluate the candidate\u2019s professional competence and had direct legal consequences for him. The Court applied the three-limbed content-purpose-effect test established by Opinion 4/2007. On the "),
    it("content"),
    t(" limb, the answers reflected the candidate\u2019s knowledge and thought processes. On the "),
    it("purpose"),
    t(" limb, they existed to evaluate Peter Nowak. On the "),
    it("effect"),
    t(" limb, the results determined whether he could practice as a chartered accountant."),
  ]),

  p("Prompts entered into the Crucible satisfy none of these limbs. On content: a prompt instructing an AI to draft a document does not, of itself, contain information about the person who typed it. On purpose: the Crucible\u2019s purpose is to generate a response for the user, not to evaluate the user \u2014 the alchemical mastery score is a separate function addressed under Question 2. On effect: the prompt itself has no legal or comparable consequences for the user. Where all three limbs of the content-purpose-effect test fail, the \u2018relating to\u2019 element of Article 4(1) is not met, and the prompt is not personal data."),

  h2("C. The SRB relative approach supports SCRIPTUM\u2019s position on third-party transmission"),

  pm([
    t("In "),
    b("EDPS v SRB"),
    t(" (C-413/23 P), the Court confirmed that personal data is a relative concept: the same information may constitute personal data in the hands of one controller but not in the hands of another, depending on whether that controller possesses \u2018reasonably likely\u2019 means of identification. This builds on the earlier holding in "),
    b("Breyer"),
    t(" (C-582/14), where the Court held that dynamic IP addresses were personal data because the website operator could, through legal channels, obtain subscriber information from the internet service provider."),
  ]),

  p("Where SCRIPTUM transmits prompts to a third-party language model operator, the relevant question under the SRB approach is whether that operator has reasonable means to connect the prompt text to any natural person. If the prompts are transmitted without user identifiers, session metadata, or account information, the operator lacks such means. The prompts are, in the operator\u2019s hands, anonymous functional inputs. The DPA\u2019s finding of a violation under Articles 13 and 14 GDPR cannot stand if the transmitted data does not constitute personal data in the hands of the recipient."),

  h2("D. The distinction between \u2018prompts containing personal data\u2019 and \u2018prompts being personal data\u2019"),

  p("The DPA\u2019s decision conflates two distinct propositions. The first proposition \u2014 that certain prompts contained personal data of third parties, such as client names and patient records \u2014 is factual and SCRIPTUM acknowledges it. The second proposition \u2014 that textual prompts are inherently personal data by virtue of being authored by a natural person \u2014 is a legal conclusion that does not follow from the first. The 43 prompts that contained third-party identifiers constituted personal data because of their specific content, not because of their nature as prompts. The remaining prompts \u2014 those containing only generic professional instructions \u2014 did not."),

  p("The EDPB\u2019s ChatGPT Taskforce Report of 23 May 2024 itself draws this distinction. The Report addresses personal data within prompts \u2014 that is, instances where users type names, health information, or other identifiers into a chatbot. It does not hold that the prompt as a category of data is automatically personal data. The Court should preserve this distinction to maintain the regulatory coherence of Article 4(1)."),

  h2("E. Treating all prompts as personal data creates unworkable over-breadth"),

  pm([
    t("If every textual instruction entered into a software system were personal data by virtue of theoretically revealing the user\u2019s \u2018thinking style\u2019 or \u2018mental identity,\u2019 Article 4(1) would encompass search engine queries, voice assistant commands, autocomplete entries, and every human-computer interaction involving text. As Professor Purtova has observed, this risks rendering the GDPR \u2018the law of everything\u2019 \u2014 a framework so expansive as to lose meaningful regulatory force. The Court should interpret the definition purposively, in light of its objective of protecting individuals from risks to their privacy, rather than extending it to cover all functional interactions with machines."),
  ]),

  p("SCRIPTUM submits that the first question should be answered as follows: textual prompts entered into an AI system constitute personal data within the meaning of Article 4(1) GDPR only where they contain identifiers of natural persons, or where the controller has reasonable means to link the prompt to an identified person through accompanying metadata. The prompt as such, as a functional instruction, does not constitute personal data. The subsequent transmission of prompts to a third-party operator does not alter this analysis where the prompts are transmitted without accompanying identifiers."),

  // ═══════════ III. QUESTION 2: AI ACT ═══════════

  h1("III. Question 2: The Crucible\u2019s Scoring System Is Not an AI System"),

  h2("A. Article 3(1) requires the capability to \u2018infer\u2019"),

  pm([
    t("Article 3(1) of Regulation 2024/1689 defines an \u2018AI system\u2019 as a machine-based system designed to operate with varying levels of autonomy that, for explicit or implicit objectives, \u2018infers, from the input it receives, how to generate outputs such as predictions, content, recommendations, or decisions.\u2019 Recital 12 clarifies that this capability to infer refers to \u2018a capability of AI systems to "),
    it("derive models or algorithms, or both, from inputs or data"),
    t(".\u2019 The operative word is \u2018derive.\u2019 A system that applies a pre-existing, human-designed model does not derive anything; it executes."),
  ]),

  h2("B. Recital 12 explicitly excludes human-authored rule systems"),

  p("Recital 12 states that the definition \u2018should not cover systems that are based on the rules defined solely by natural persons to automatically execute operations.\u2019 The Crucible\u2019s alchemical mastery scoring system is calculated using a deterministic algorithm designed entirely by SCRIPTUM\u2019s engineers. Every rule, weight, and threshold was specified by human experts on the basis of their pedagogical judgment. The system does not learn from data, does not adapt after deployment, and produces identical outputs for identical inputs. Given identical prompts from two different users, the scoring function will return identical scores. This is the paradigmatic example of the traditional software that Recital 12 was designed to exclude."),

  h2("C. The Commission guidelines and OECD Explanatory Memorandum confirm this exclusion"),

  pm([
    t("The European Commission\u2019s non-binding guidelines on the definition of an AI system, published on 6 February 2025, explicitly list \u2018simple deterministic rule-based tools\u2019 and \u2018basic statistical estimators with fixed algorithms\u2019 as examples falling outside the AI Act\u2019s scope. The OECD\u2019s "),
    it("Explanatory Memorandum on the Updated OECD Definition of an AI System"),
    t(" (March 2024), which informed the AI Act\u2019s definition, further clarifies that \u2018infers how to generate outputs\u2019 means the system processes input in a way that \u2018goes beyond straightforward data processing.\u2019 A scoring function that applies a weighted sum to predetermined criteria is straightforward data processing. It does not go beyond it."),
  ]),

  h2("D. The legislative history supports a narrow reading"),

  p("The Commission\u2019s original 2021 proposal (COM(2021) 206 final) used a technique-based definition anchored in Annex I, which listed machine learning, logic-based approaches, and statistical methods. Under that original formulation, a deterministic scoring algorithm using statistical weighting would have been expressly captured. The co-legislators deliberately abandoned this approach during trilogue negotiations in 2022\u20132023, replacing it with the functional \u2018inference\u2019 criterion precisely because the Annex I approach was criticised \u2014 including by the European Law Institute \u2014 as over-inclusive and as potentially capturing virtually all software. Interpreting Article 3(1) to encompass deterministic scoring algorithms would resurrect the very over-inclusiveness that the co-legislators intended to eliminate."),

  h2("E. The \u2018varying levels of autonomy\u2019 requirement is not met"),

  p("Article 3(1) requires that an AI system be \u2018designed to operate with varying levels of autonomy.\u2019 While Recital 12 states that a system \u2018may exhibit adaptiveness after deployment,\u2019 the autonomy requirement is not merely permissive \u2014 it demands that the system possess at least some capacity for independent judgment in generating its outputs. A deterministic scoring function exercises no judgment whatsoever: its output is entirely predetermined by its inputs and its human-authored rules. It possesses less autonomy than a thermostat, which at least responds to environmental conditions. The Court should not interpret \u2018varying levels of autonomy\u2019 as encompassing zero autonomy."),

  p("SCRIPTUM submits that the second question should be answered as follows: the concept of \u2018AI system\u2019 in Article 3(1) of Regulation 2024/1689 does not encompass deterministic scoring algorithms which apply human-defined rules and weights to analyse textual input and assign numerical scores, but which do not derive their models or algorithms from data, do not employ machine learning, and exercise no autonomous judgment in generating their outputs."),

  // ═══════════ IV. QUESTION 3: CHARTER ═══════════

  h1("IV. Question 3: GDPR Restrictions on Educational Targeting Are Disproportionate"),

  h2("A. SCRIPTUM exercises rights under both Articles 11 and 13 of the Charter"),

  pm([
    t("Article 11(1) of the Charter protects the right to \u2018impart information and ideas without interference.\u2019 Critically, this right has two dimensions: it protects both the speaker\u2019s right to impart and the audience\u2019s right to receive. The Adepts who voluntarily registered to receive educational content exercise their Article 11 right to receive information about AI tools relevant to their professional practice. The DPA\u2019s decision restricts not only SCRIPTUM\u2019s right to impart but also the Adepts\u2019 right to receive."),
  ]),

  pm([
    t("Article 13 provides that \u2018scientific research shall be free of constraint\u2019 and that \u2018academic freedom shall be respected.\u2019 In "),
    b("Commission v Hungary"),
    t(" (C-66/18), the Court confirmed that Article 13 has both an individual and an institutional dimension, protecting the freedom to \u2018freely distribute information\u2019 in the field of research and education. SCRIPTUM, as a non-profit educational organisation dedicated to AI literacy, exercises this institutional freedom when it disseminates training materials to professionals."),
  ]),

  h2("B. The CJEU\u2019s proportionality framework requires context-dependent balancing"),

  pm([
    t("Under Article 52(1) of the Charter, any limitation on a fundamental right must be provided for by law, must respect the essence of the right, and must satisfy the principle of proportionality. The CJEU applies a three-step proportionality test: suitability, necessity, and balancing "),
    it("stricto sensu"),
    t(". In "),
    b("Promusicae"),
    t(" (C-275/06), the Court established that no single fundamental right automatically prevails over another; a \u2018fair balance\u2019 must be struck. In "),
    b("Google Spain"),
    t(" (C-131/12), the Court distinguished between commercial economic interests, which carry less weight, and the public\u2019s interest in accessing information, which may tip the balance against data protection in appropriate cases."),
  ]),

  p("SCRIPTUM\u2019s activities are non-commercial and serve the public interest. Training lawyers in responsible AI use improves the quality of legal services. Training medical practitioners reduces the risk of misuse. This educational purpose carries significantly more weight in the balancing exercise than the commercial advertising at issue in cases such as Meta Platforms (Bundeskartellamt)."),

  h2("C. Meta Platforms (Bundeskartellamt) is distinguishable"),

  pm([
    t("The DPA may rely on the Court\u2019s holding in "),
    b("Meta Platforms"),
    t(" (C-252/21) that personalised content delivery based on profiling was \u2018not objectively indispensable\u2019 for the provision of a social network. That case concerned a dominant commercial platform that aggregated user data across third-party websites for the purpose of behavioural advertising aimed at revenue extraction. SCRIPTUM is neither dominant nor commercial. It does not aggregate data from external sources. It does not sell advertising. It uses professional profile data, voluntarily provided by participants, to tailor educational content to each participant\u2019s professional field. The factual matrix is fundamentally different."),
  ]),

  h2("D. A blanket prohibition fails the necessity test"),

  p("Under the necessity limb of the proportionality test, the restriction must be the least restrictive measure capable of achieving the legitimate aim. The legitimate aim here \u2014 protecting the data subjects\u2019 privacy \u2014 can be achieved through measures less restrictive than a blanket prohibition on profiling-based educational targeting. Such alternatives include: requiring explicit opt-in consent for profiled recommendations (which SCRIPTUM already provides through the Adept registration); providing transparent information about the profiling methodology (which the Crucible\u2019s privacy policy does); limiting retention periods for profile data; and permitting cohort-based rather than individual profiling. A blanket prohibition, which prevents SCRIPTUM from tailoring educational content even to willing recipients who have specifically opted in, goes beyond what is necessary."),

  h2("E. The GDPR itself recognises the need for reconciliation"),

  p("The GDPR acknowledges that data protection is not an absolute right. Recital 4 provides that the right to data protection \u2018must be considered in relation to its function in society and be balanced against other fundamental rights, in accordance with the principle of proportionality.\u2019 Article 85 specifically requires Member States to reconcile data protection with freedom of expression and \u2018processing for academic purposes.\u2019 Article 89 provides derogations from Articles 15, 16, 18, and 21 for processing carried out for scientific research purposes, subject to appropriate safeguards. These provisions demonstrate the legislature\u2019s recognition that GDPR restrictions must yield where they disproportionately impair educational and scientific activities."),

  p("SCRIPTUM submits that the third question should be answered as follows: restrictions on the targeted dissemination of educational content on the basis of professional profiling must be assessed for compatibility with Articles 11 and 13 of the Charter through a proportionality analysis under Article 52(1). Where the profiling serves a non-commercial, public-interest educational purpose, where the data subjects have voluntarily opted in, and where less restrictive alternatives exist to protect their privacy, a blanket prohibition is disproportionate and incompatible with the Charter."),

  // ═══════════ V. QUESTION 4: CONSENT ═══════════

  h1("V. Question 4: Consent Was Freely Given"),

  h2("A. The main service was available without consent"),

  p("Article 7(4) GDPR provides that, when assessing whether consent is freely given, \u2018utmost account shall be taken of whether, inter alia, the performance of a contract, including the provision of a service, is conditional on consent to the processing of personal data that is not necessary for the performance of that contract.\u2019 Recital 43 reinforces this by providing that consent is presumed not to be freely given where \u2018the performance of a contract, including the provision of a service, is dependent on the consent despite such consent not being necessary for such performance.\u2019"),

  p("The critical distinction is between the main service and additional services. SCRIPTUM\u2019s main service \u2014 training events held at universities \u2014 was available to all participants regardless of whether they used the Crucible. Participation in the event, attendance at the training sessions, receipt of printed materials, and interaction with SCRIPTUM\u2019s instructors did not require registration on the Crucible, completion of the Formulary, or consent to any data processing. The Crucible was an optional, supplementary tool that participants could freely choose to use or not to use."),

  h2("B. Planet49 and Orange Romania are distinguishable"),

  pm([
    t("In "),
    b("Planet49"),
    t(" (C-673/17), consent was invalid because it was inferred from participation in a promotional lottery \u2014 there was no separate affirmative act for the data processing at issue. In the present case, the Crucible presented a clear, separate consent pop-up requiring an active selection among three unticked options before any processing commenced. This satisfies the "),
    b("Planet49"),
    t(" requirement of a \u2018clear affirmative act.\u2019"),
  ]),

  pm([
    t("In "),
    b("Orange Romania"),
    t(" (C-61/19), consent was invalid because the contract contained a pre-ticked clause and the contract terms misled the data subject about whether the contract could be concluded without consent. The Court emphasised that requiring completion of an \u2018additional form to express refusal\u2019 unduly affected the data subject\u2019s freedom of choice. The Crucible\u2019s mechanism was the opposite: the default state was no selection; the user had to actively choose \u2018Yes\u2019; and the \u2018No\u2019 option was equally prominent and did not require any additional steps."),
  ]),

  h2("C. No detriment existed for refusing consent"),

  p("The EDPB Guidelines 05/2020 on consent establish, at paragraphs 47\u201348, that consent is not freely given where refusal results in \u2018detriment\u2019 to the data subject. Detriment may include a reduced quality of service, exclusion from benefits, or social pressure. Participants who declined to use the Crucible suffered no detriment: they could attend the full event, participate in all training sessions, receive all non-digital materials, ask questions, and interact with instructors. There was no reduced quality of the main service, no social sanction, and no exclusion from any component of the event other than the optional digital tool. The EDPB\u2019s detriment test is clearly satisfied."),

  h2("D. The processing was necessary for the provision of the Crucible service"),

  p("Article 7(4) targets situations where a controller demands consent to processing that is \u2018not necessary\u2019 for the service being provided. For the Crucible, the data processing was inherently necessary: the Formulary cannot generate personalised feedback, recommendations, or an alchemical mastery score without analysing the participant\u2019s prompts. The connection between the processing and the service is not merely ancillary \u2014 it is constitutive. This is not a case where a service provider demands consent to extraneous processing (such as behavioural advertising) as a condition for an unrelated service (such as a social network). The Crucible\u2019s data processing is the service."),

  h2("E. No power imbalance vitiates consent"),

  pm([
    t("Recital 43 notes that consent is unlikely to be freely given where there is \u2018a clear imbalance between the data subject and the controller, in particular where the controller is a public authority.\u2019 In "),
    b("Meta Platforms"),
    t(" (C-252/21), the Court held that a dominant market position is \u2018an important factor\u2019 in assessing whether consent is free, because dominance \u2018is liable to affect the freedom of choice.\u2019 SCRIPTUM is neither a public authority nor a dominant undertaking. It is a non-profit educational organisation. The participants were adult professionals \u2014 lawyers, medical practitioners, financial analysts \u2014 who are accustomed to making informed decisions about data processing in their daily work. No power imbalance of the kind contemplated by Recital 43 or the "),
    it("Meta Platforms"),
    t(" judgment exists in this context."),
  ]),

  p("SCRIPTUM submits that the fourth question should be answered as follows: the requirement of \u2018freely given\u2019 consent in Article 7 GDPR does not preclude the validity of consent where the processing of personal data is a condition for access to an additional digital service provided in the context of a free educational event, given that: (i) the main service is available without such consent; (ii) the data subject has a genuine, uncoerced choice communicated through clear, unticked options; (iii) refusal entails no detriment to the data subject; (iv) the processing is necessary for the provision of the additional service itself; and (v) no power imbalance between the controller and the data subject vitiates the consent."),

  // ═══════════ VI. CONCLUSION ═══════════

  h1("VI. Conclusion"),

  p("For the foregoing reasons, SCRIPTUM respectfully requests that the Court of Justice answer the preliminary reference questions as follows:"),

  conclusion("Textual prompts entered into an AI system constitute personal data within the meaning of Article 4(1) GDPR only where they contain identifiers of natural persons, or where the controller has reasonable means to link the prompt to an identified person through accompanying metadata. The prompt as such, as a functional instruction, does not constitute personal data. Transmission to a third-party operator does not alter this analysis where prompts are transmitted without accompanying identifiers."),
  conclusion("The concept of \u2018AI system\u2019 in Article 3(1) of Regulation 2024/1689 does not encompass deterministic scoring algorithms applying human-defined rules and weights that do not derive models or algorithms from data, do not employ machine learning, and exercise no autonomous judgment."),
  conclusion("Restrictions on profiling-based dissemination of educational content must be assessed under Article 52(1) of the Charter. A blanket prohibition is disproportionate where the profiling serves a non-commercial, public-interest educational purpose, data subjects have voluntarily opted in, and less restrictive alternatives exist."),
  conclusion("Consent is freely given within the meaning of Article 7 GDPR where the main service is available without consent, the data subject has a genuine and uncoerced choice, refusal entails no detriment, the processing is necessary for the additional service, and no power imbalance vitiates the consent."),
];

// ═══════════════════════════════════════════════════
// REFERENCES
// ═══════════════════════════════════════════════════

const references = [
  new Paragraph({ children: [new PageBreak()] }),
  h1("List of References"),

  refHead("Legislation"),
  ref("Charter of Fundamental Rights of the European Union [2012] OJ C 326/391"),
  ref("Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data (General Data Protection Regulation) [2016] OJ L 119/1"),
  ref("Regulation (EU) 2024/1689 of the European Parliament and of the Council of 13 June 2024 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act) [2024] OJ L 2024/1689"),
  ref("European Commission, Proposal for a Regulation of the European Parliament and of the Council laying down harmonised rules on artificial intelligence (Artificial Intelligence Act) and amending certain Union legislative acts, COM(2021) 206 final"),

  refHead("Case Law of the Court of Justice"),
  ref("Case C-275/06 Productores de M\u00fasica de Espa\u00f1a (Promusicae) v Telef\u00f3nica de Espa\u00f1a SAU [2008] ECLI:EU:C:2008:54"),
  ref("Case C-73/07 Tietosuojavaltuutettu v Satakunnan Markkinap\u00f6rssi Oy (Satamedia) [2008] ECLI:EU:C:2008:727"),
  ref("Case C-131/12 Google Spain SL v Agencia Espa\u00f1ola de Protecci\u00f3n de Datos (Google Spain) [2014] ECLI:EU:C:2014:317"),
  ref("Case C-582/14 Patrick Breyer v Bundesrepublik Deutschland (Breyer) [2016] ECLI:EU:C:2016:779"),
  ref("Case C-434/16 Peter Nowak v Data Protection Commissioner (Nowak) [2017] ECLI:EU:C:2017:994"),
  ref("Case C-136/17 GC and Others v Commission nationale de l\u2019informatique et des libert\u00e9s (GC and Others) [2019] ECLI:EU:C:2019:773"),
  ref("Case C-673/17 Bundesverband der Verbraucherzentralen v Planet49 GmbH (Planet49) [2019] ECLI:EU:C:2019:801"),
  ref("Case C-66/18 European Commission v Hungary (Commission v Hungary) [2020] ECLI:EU:C:2020:792"),
  ref("Case C-61/19 Autoritatea Nationala de Supraveghere a Prelucrarii Datelor cu Caracter Personal v Orange Romania SA (Orange Romania) [2020] ECLI:EU:C:2020:901"),
  ref("Case C-252/21 Meta Platforms Inc v Bundeskartellamt (Meta Platforms) [2023] ECLI:EU:C:2023:537"),
  ref("Case C-413/23 P European Data Protection Supervisor v Single Resolution Board (EDPS v SRB) [2025]"),

  refHead("Regulatory Guidance"),
  ref("Article 29 Data Protection Working Party, \u2018Opinion 4/2007 on the Concept of Personal Data\u2019 (WP 136, 20 June 2007)"),
  ref("European Data Protection Board, \u2018Guidelines 05/2020 on Consent under Regulation 2016/679\u2019 (Version 1.1, 4 May 2020)"),
  ref("European Data Protection Board, \u2018Report of the Work Undertaken by the ChatGPT Taskforce\u2019 (23 May 2024)"),
  ref("European Data Protection Board, \u2018Opinion 28/2024 on Certain Data Protection Aspects Related to the Processing of Personal Data in the Context of AI Models\u2019 (17 December 2024)"),
  ref("European Commission, \u2018Commission Guidelines on the Definition of an Artificial Intelligence System\u2019 (C/2025/861, 6 February 2025)"),
  ref("Organisation for Economic Co-operation and Development, \u2018Explanatory Memorandum on the Updated OECD Definition of an AI System\u2019 (OECD Artificial Intelligence Papers No 8, March 2024)"),

  refHead("Academic Sources"),
  ref("Purtova N, \u2018The Law of Everything: Broad Concept of Personal Data and Future of EU Data Protection Law\u2019 (2018) 10(1) International Data Privacy Law 40"),
];

// ═══════════════════════════════════════════════════
// BUILD DOCUMENT
// ═══════════════════════════════════════════════════

const doc = new Document({
  styles: {
    default: { document: { run: { font: F, size: SZ } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: F },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: SZ, bold: true, font: F, italics: true },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 }
      },
    ]
  },
  numbering: {
    config: [{
      reference: "conclusions",
      levels: [{
        level: 0, format: LevelFormat.DECIMAL, text: "%1.",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
      }]
    }]
  },
  sections: [
    // Title page (no header/footer)
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      children: titlePage
    },
    // ToC page
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: TEAM, font: F, size: 18, italics: true })]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ children: [PageNumber.CURRENT], font: F, size: 18 })]
          })]
        })
      },
      children: tocPage
    },
    // Main argumentation + references
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: TEAM, font: F, size: 18, italics: true })]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ children: [PageNumber.CURRENT], font: F, size: 18 })]
          })]
        })
      },
      children: [...mainArg, ...references]
    }
  ]
});

// ═══════════════════════════════════════════════════
// GENERATE
// ═══════════════════════════════════════════════════

Packer.toBuffer(doc).then(buffer => {
  const outPath = "/Users/kit/Desktop/Codius/writing alchemy/SCRIPTUM-Brief-Applicant.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Written to:", outPath);
  console.log("Size:", (buffer.length / 1024).toFixed(1), "KB");
  console.log("Paragraphs numbered:", paraNum);
});
