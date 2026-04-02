const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Header, Footer,
  AlignmentType, HeadingLevel, PageNumber, PageBreak,
  LevelFormat, BorderStyle
} = require("docx");

const FONT = "Liberation Serif";
const FONT_SIZE = 24; // 12pt

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: FONT, size: FONT_SIZE }
      }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: FONT, allCaps: true },
        paragraph: { spacing: { before: 360, after: 240 }, alignment: AlignmentType.CENTER, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: FONT },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } }
        }]
      },
      {
        reference: "numbers",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } }
        }]
      },
      {
        reference: "questions",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  sections: [
    // === TITLE PAGE ===
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      children: [
        spacer(6),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
          children: [new TextRun({ text: "Writing Alchemy Moot Court", font: FONT, size: 36, bold: true })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "2026 Problem", font: FONT, size: 28, bold: true })]
        }),
        spacer(2),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "Inspired by the format of the Helsinki Information Law Moot Court", font: FONT, size: 22, italics: true })]
        }),
        spacer(4),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "All names, organisations and jurisdictions are fictitious.", font: FONT, size: 20, italics: true })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "This problem is intended for educational purposes.", font: FONT, size: 20, italics: true })]
        }),
      ]
    },
    // === PROBLEM ===
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
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "Writing Alchemy Moot Court 2026 Problem", font: FONT, size: 18, italics: true })]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "Page ", font: FONT, size: 18 }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 18 })]
          })]
        })
      },
      children: [
        // Title
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 360 },
          children: [new TextRun({ text: "Writing Alchemy Moot Court 2026 Problem", font: FONT, size: 28, bold: true })]
        }),

        // Jurisdiction
        p("The constitution of Scriptoria guarantees freedom of scientific activity, freedom of expression and the right to the protection of personal data. Scriptoria is a Member State of the European Union and a signatory of the European Convention on Human Rights."),

        // SCRIPTUM intro
        para([
          t("The Organisation for the Promotion of Modern Writing Alchemy ("),
          b("\"SCRIPTUM\""),
          t(") was founded in 2021 as a non-profit organisation whose purpose is to train a wide range of professionals (lawyers, medical practitioners, analysts, engineers) in working with large language models. SCRIPTUM regularly holds training events at universities, law firms and hospitals, where it offers participants the opportunity to master "),
          t("\"the alchemy of prompting\""),
          t(" \u2014 a methodology for formulating textual instructions to artificial intelligence systems."),
        ]),

        // The CRUCIBLE
        para([
          t("As part of its events, SCRIPTUM provides participants with access to its web application "),
          b("\"the Crucible\""),
          t(". Participants register on the Crucible from their own devices and complete a course of 30 practical exercises ("),
          b("\"the Formulary\""),
          t("), some of which concern legal writing (e.g. \"Draft a claim for the protection of personal data\"), medical documentation (e.g. \"Prepare a discharge summary for a patient with Type II diabetes\"), and general business writing (e.g. \"Write a letter of complaint to a contractor\")."),
        ]),

        // How the Crucible works
        p("To complete each exercise in the Formulary, participants enter textual instructions (prompts) in natural language into the Crucible. The Crucible transmits these prompts, together with SCRIPTUM\u2019s system instructions, to a third-party large language model and returns the generated response to the participant. On the final screen of the Formulary, participants complete a questionnaire which includes their profession, specialisation, level of experience, and contact email address."),

        // Analysis output
        p("The Crucible analyses the prompts entered, using an algorithm designed by SCRIPTUM, and provides the participant with the following information:"),

        bullet("An \"alchemical mastery\" score \u2014 a numerical indicator from 1 to 100 characterising the quality of the participant\u2019s prompt formulation;"),
        bullet("Personalised recommendations for improving prompting skills in the participant\u2019s specific professional field;"),
        bullet("A list of \"formulae\" \u2014 prompt templates selected on the basis of the participant\u2019s profession and writing style."),

        // Consent popup
        p("When participants first access the Crucible, they are presented with the following pop-up:"),

        indent("In order to provide you with its analysis and recommendations, the Crucible processes personal data, including data relating to your professional activity and working style. We need you to consent to this processing. We use a layered privacy notice \u2014 for more information, please click HERE!"),
        indent("Please note that you must be at least 18 years old to use the Crucible."),
        indent("\u25CB YES, I AM AT LEAST 18 YEARS OLD AND I CONSENT TO THE PROCESSING"),
        indent("\u25CB NO, I DO NOT CONSENT"),
        indent("\u25CB I AM UNDER 18 YEARS OLD"),

        p("Users who do not give their consent cannot complete the Formulary."),

        // Adept popup
        p("After receiving their results, users are presented with a pop-up which states:"),

        indent("Become an Adept!"),
        spacer(0),
        indent("By sharing your results and \"formulae\" on professional networks, you can help colleagues master the alchemy of modern writing! What\u2019s more, if you become an Adept, we will be able to send you updated \"formulae\", new formulations and information about new language models, tailored to your specialisation and working style."),
        spacer(0),
        indent("Never miss an update \u2014 be among those who know the right words!"),
        spacer(0),
        indent("For more information, please see our privacy policy."),
        spacer(0),
        indent("Click HERE to automatically publish your results and become an Adept!"),

        // Privacy policy section
        p("Users who click on the link to the privacy policy are taken to a section which states:"),

        indent("By becoming an Adept, you acknowledge that you are manifestly making information about your professional activity and working style public within the meaning of the General Data Protection Regulation (\"the GDPR\"), article 9(2)(e). As part of its legitimate interest in the dissemination of knowledge and the raising of awareness, SCRIPTUM will subsequently process your personal data for the purposes of providing targeted content relating to your professional specialisation. This personal data is processed on the basis of our legitimate interest under the GDPR, article 6(1)(f), and on the basis that you have manifestly made that information public under article 9(2)(e). We will never process personal data for purposes other than those provided as part of the Crucible."),
        spacer(0),
        indent("You may object to this processing by completing the Objection Form, which may be found by clicking HERE."),

        // NED Head scheme explanation
        para([
          t("Under the Adept programme, SCRIPTUM purchases advertising services from relevant professional social media platforms and uses these to deliver targeted information to registered Adepts. SCRIPTUM uses this to disseminate its own original materials \u2014 reviews of new language models, comparisons of AI tools for lawyers and medical practitioners, as well as editorial content. SCRIPTUM also uses the Adept programme to share publicly available promotional materials created by developers of language models (OpenAI, Anthropic, Google DeepMind, "),
          t("etc."),
          t("). SCRIPTUM does not have any agreement with these companies for doing so, nor is it paid or funded by them in any way."),
        ]),

        // === EVENT ===
        para([
          t("On 15 October 2025, SCRIPTUM held an event at the Scriptorian National University of Law. During that event, 312 participants became Adepts. Of these participants, 187 were practising lawyers, 68 were medical students, 41 were financial analysts, and 16 were undergraduate law students aged between 18 and 21."),
        ]),

        // Third-party data in prompts
        p("Among the prompts entered by participants into the Crucible during the event, at least 43 contained actual personal data of third parties \u2014 names of law firm clients, fragments of patient medical records, and company financial data. SCRIPTUM transmitted these prompts to the third-party large language model for the generation of responses, without removing the personal data of those third parties and without informing those third parties of such transmission."),

        // === DPA DECISION ===
        para([
          t("On 12 February 2026, the Scriptorian Data Protection Authority, which had also been designated as the competent authority for monitoring compliance with Regulation (EU) 2024/1689 of the European Parliament and of the Council of 13 June 2024 laying down harmonised rules on artificial intelligence ("),
          b("\"the AI Act\""),
          t("), issued a decision concerning SCRIPTUM\u2019s use of the Crucible and the Adept programme. The conclusions of that decision stated as follows:"),
        ]),

        // Post-August findings
        new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "Regarding SCRIPTUM\u2019s activities after 1 August 2025:", font: FONT, size: FONT_SIZE, italics: true })]
        }),

        bullet("By transmitting prompts containing personal data of third parties to a third-party large language model without an appropriate legal basis and without informing the data subjects, SCRIPTUM was in violation of the GDPR, articles 6(1), 13 and 14."),
        bullet("By providing targeted content to Adepts on the basis of their professional data and prompting style, SCRIPTUM was engaging in profiling within the meaning of the GDPR, article 4(4), and could not rely on legitimate interest as the legal basis for such processing, as the interests and fundamental rights of the data subjects overrode those of SCRIPTUM."),
        bullet("The Crucible\u2019s \"alchemical mastery\" scoring system constitutes an artificial intelligence system carrying out the evaluation of natural persons within the meaning of the AI Act. SCRIPTUM failed to comply with the transparency requirements laid down in article 50 of the AI Act."),

        // Pre-August findings
        new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: "Regarding SCRIPTUM\u2019s activities before 1 August 2025:", font: FONT, size: FONT_SIZE, italics: true })]
        }),

        bullet("Following the jurisprudence of the Court of Justice of the European Union and the guidelines of the European Data Protection Board, SCRIPTUM was unable validly to rely on the GDPR, articles 6(1)(f) and 9(2)(e), for the provision of targeted content on the basis of professional profiling. Such processing was, therefore, in violation of the GDPR."),
        bullet("The consent obtained by SCRIPTUM through the Crucible did not meet the requirements of the GDPR, article 7, as it was bundled with the provision of the service and was not freely given within the meaning of that article."),

        // === APPEAL ===
        p("SCRIPTUM appealed this decision to the Scriptorian High Court, arguing that:"),

        bullet("Textual instructions (prompts) entered by users into the Crucible do not constitute personal data within the meaning of the GDPR, article 4(1), as they are functional commands addressed to a machine and not information relating to an identified natural person, even if they incidentally contain names or other identifiers;"),
        bullet("The Crucible\u2019s \"alchemical mastery\" scoring system is not an AI system within the meaning of article 3(1) of the AI Act, as it uses a deterministic scoring algorithm rather than a machine learning model, and does not fall within the transparency requirements of article 50;"),
        bullet("The restriction on the targeted dissemination of educational content to Adepts violates SCRIPTUM\u2019s freedom of expression and freedom of scientific activity under the Charter of Fundamental Rights, articles 11 and 13, as well as the Adepts\u2019 right to receive information;"),
        bullet("The Scriptorian Data Protection Authority had misinterpreted the requirements of article 7 of the GDPR regarding consent, as users had a genuine choice not to complete the Formulary, and consent was not a condition for the provision of SCRIPTUM\u2019s main service (training events at universities) but only for an additional service (the Crucible)."),

        // === PRELIMINARY REFERENCE ===
        p("The Scriptorian High Court considered that this matter involved the interpretation of EU law and therefore made a preliminary reference to the CJEU. The following questions were referred:"),

        numbered("Is the concept of \"personal data\" in article 4(1) of the GDPR to be interpreted as encompassing textual instructions (prompts) entered by a natural person into an artificial intelligence system, where such instructions contain identifiers of third parties, and does the subsequent transmission of such instructions to the operator of a language model affect this interpretation?"),
        numbered("Is the concept of \"AI system\" in article 3(1) of the AI Act to be interpreted as encompassing deterministic scoring algorithms which analyse textual input from users and assign numerical scores, but which do not employ machine learning models?"),
        numbered("Are restrictions on the targeted dissemination of educational content on the basis of professional profiling, as established by the GDPR, compatible with freedom of expression and freedom of scientific activity under articles 11 and 13 of the Charter of Fundamental Rights, also taking into account articles 7 and 8 of the Charter?"),
        numbered("Is the requirement of \"freely given\" consent in article 7 of the GDPR to be interpreted as precluding the validity of consent where the processing of personal data is a condition for access to an additional digital service provided in the context of a free educational event, given that the main service (participation in the event) is available without the giving of such consent?"),

        // === INSTRUCTIONS ===
        spacer(1),
        new Paragraph({
          spacing: { before: 200, after: 200 },
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: "000000", space: 8 } },
          children: []
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({
            text: "Mooters are asked to prepare two briefs, one on behalf of SCRIPTUM and one on behalf of the Scriptorian Data Protection Authority. Mooters should disregard issues of admissibility and only address the merits of the case. Submissions must be made in accordance with the rules of procedure of the moot and submitted before the deadline, as indicated in the moot\u2019s timetable.",
            font: FONT, size: FONT_SIZE, bold: true
          })]
        }),
      ]
    }
  ]
});

// === Helpers ===
function spacer(n) {
  return new Paragraph({ spacing: { before: n * 120 }, children: [] });
}

function p(text) {
  return new Paragraph({
    spacing: { after: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: FONT, size: FONT_SIZE })]
  });
}

function para(runs) {
  return new Paragraph({
    spacing: { after: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children: runs
  });
}

function t(text) {
  return new TextRun({ text, font: FONT, size: FONT_SIZE });
}

function b(text) {
  return new TextRun({ text, font: FONT, size: FONT_SIZE, bold: true });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 120 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: FONT, size: FONT_SIZE })]
  });
}

function numbered(text) {
  return new Paragraph({
    numbering: { reference: "questions", level: 0 },
    spacing: { after: 160 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: FONT, size: FONT_SIZE })]
  });
}

function indent(text) {
  return new Paragraph({
    spacing: { after: 60 },
    indent: { left: 720, right: 720 },
    children: [new TextRun({ text, font: FONT, size: FONT_SIZE - 2, italics: false })]
  });
}

// === Generate ===
Packer.toBuffer(doc).then(buffer => {
  const outPath = "/Users/kit/Desktop/Codius/writing alchemy/Writing-Alchemy-Moot-Court-Problem.docx";
  fs.writeFileSync(outPath, buffer);
  console.log("Written to:", outPath);
  console.log("Size:", (buffer.length / 1024).toFixed(1), "KB");
});
