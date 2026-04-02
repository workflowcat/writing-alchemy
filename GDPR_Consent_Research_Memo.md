# RESEARCH MEMO: Is Consent "Freely Given" Under GDPR Article 7 When Data Processing Is Conditioned on Access to an Additional Digital Service at a Free Event?

**Date:** 2 April 2026
**Subject:** Validity of consent where the main service (event participation) does not require consent, but an additional digital service (e.g., "Crucible" or similar optional tool) does
**Scope:** GDPR Articles 4(11), 6(1)(a), 7(4); Recital 43; CJEU case law; EDPB Guidelines 05/2020

---

## 1. STATUTORY FRAMEWORK

### 1.1 GDPR Article 7 -- Conditions for Consent

**Article 7(1):** Where processing is based on consent, the controller shall be able to demonstrate that the data subject has consented to processing of his or her personal data.

**Article 7(2):** If the data subject's consent is given in the context of a written declaration which also concerns other matters, the request for consent shall be presented in a manner which is clearly distinguishable from the other matters, in an intelligible and easily accessible form, using clear and plain language.

**Article 7(3):** The data subject shall have the right to withdraw his or her consent at any time. The withdrawal of consent shall not affect the lawfulness of processing based on consent before its withdrawal. Prior to giving consent, the data subject shall be informed thereof. It shall be as easy to withdraw as to give consent.

**Article 7(4) -- THE KEY PROVISION:** When assessing whether consent is freely given, utmost account shall be taken of whether, *inter alia*, the performance of a contract, including the provision of a service, is conditional on consent to the processing of personal data that is not necessary for the performance of that contract.

**Source:** Regulation (EU) 2016/679, Article 7; see [gdpr-info.eu/art-7-gdpr](https://gdpr-info.eu/art-7-gdpr/).

### 1.2 GDPR Recital 43 -- Freely Given Consent

Recital 43 provides interpretive guidance on the "freely given" element:

> In order to ensure that consent is freely given, consent should not provide a valid legal ground for the processing of personal data in a specific case where there is a clear imbalance between the data subject and the controller, in particular where the controller is a public authority and it is therefore unlikely that consent was freely given in all the circumstances of that specific situation.
>
> Consent is presumed not to be freely given if it does not allow separate consent to be given to different personal data processing operations despite it being appropriate in the individual case, or if the performance of a contract, including the provision of a service, is dependent on the consent despite such consent not being necessary for such performance.

Recital 43 therefore establishes two presumptions against free consent:
1. **Granularity failure** -- no separate consent for separate processing operations.
2. **Conditionality failure** -- service performance is dependent on consent to processing that is unnecessary for that service.

**Source:** [gdpr-info.eu/recitals/no-43](https://gdpr-info.eu/recitals/no-43/).

### 1.3 GDPR Article 4(11) -- Definition of Consent

"Consent" of the data subject means any freely given, specific, informed and unambiguous indication of the data subject's wishes by which he or she, by a statement or by a clear affirmative action, signifies agreement to the processing of personal data relating to him or her.

---

## 2. CJEU CASE LAW

### 2.1 Planet49 -- Case C-673/17 (1 October 2019)

**Facts:** Planet49 GmbH organised an online promotional lottery. Participation required users to provide personal data. Two checkboxes appeared: one for third-party marketing (unchecked by default) and one for cookies (pre-ticked by default).

**Key holdings:**
- Consent requires a **clear affirmative act**. A pre-ticked checkbox does not constitute valid consent, because the user's inaction (failing to un-tick) does not demonstrate active, informed agreement.
- Consent must be **specific** to each purpose. Participation in a lottery does not imply consent to advertising cookies -- the purposes are distinct and require separate affirmative acts.
- The information provided to the data subject must include the **duration of cookie operation** and whether **third parties** may access those cookies.

**Relevance to our question:** Planet49 confirms that consent must be purpose-specific and cannot be inferred from engagement with a different service. Choosing to attend an event does not constitute consent to data processing by an additional digital tool.

**Source:** CJEU, Case C-673/17, *Bundesverband der Verbraucherzentralen v Planet49 GmbH*, ECLI:EU:C:2019:801; see [GDPRhub entry](https://gdprhub.eu/CJEU_-_C-673/17_-_Planet49).

### 2.2 Orange Romania -- Case C-61/19 (11 November 2020)

**Facts:** Orange Romania, a mobile telecoms provider, collected and stored copies of customers' identity documents. The contract contained a pre-ticked clause stating that the customer had been informed of, and consented to, collection and storage of their ID copy.

**Key holdings:**
- A contract clause stating that the data subject "has been informed of and has consented to" data collection does **not** demonstrate valid consent where:
  - (i) The checkbox was **ticked by the controller** before the contract was signed;
  - (ii) The contract terms **misled** the data subject about whether the contract could be concluded without consent; or
  - (iii) The data subject's **freedom of choice was unduly affected** by requiring completion of an additional form to express refusal.
- The burden of proof lies with the controller to demonstrate that consent was freely given (Article 7(1)).

**Relevance to our question:** Orange Romania is directly relevant because it addresses situations where a service provider makes it structurally difficult to refuse consent. If participants at an event feel they cannot practically refuse consent to data processing by an additional digital tool -- whether because of the way the choice is presented, social dynamics, or misleading framing -- the consent may be invalid. The case also confirms that the controller bears the burden of demonstrating that consent was genuinely free.

**Source:** CJEU, Case C-61/19, *Autoritatea Nationala de Supraveghere a Prelucrarii Datelor cu Caracter Personal v Orange Romania SA*, ECLI:EU:C:2020:901; see [GDPRhub entry](https://www.gdprhub.eu/index.php?title=CJEU_-_C-61/19_-_Orange_Romania).

### 2.3 Meta Platforms (Bundeskartellamt) -- Case C-252/21 (4 July 2023)

**Facts:** The German Federal Cartel Office (Bundeskartellamt) found that Meta's collection of user data from third-party websites and apps, and its merging of that data with Facebook accounts, constituted an abuse of dominant position. The CJEU was asked, among other things, about the validity of consent for such processing.

**Key holdings on consent:**
- Consent cannot be **freely given** where there is a **lack of genuine choice**, a **power imbalance**, or where consent for one purpose is **bundled with another purpose**.
- The fact that a controller holds a **dominant market position** does not automatically invalidate consent, but it is "an important factor" in assessing whether consent was freely given, because dominance is "liable to affect the freedom of choice" of users and "create a clear imbalance."
- Where multiple processing operations serve different purposes, **separate consents** must be obtained for each purpose. Meta was required to provide users with two distinct consents for personalised advertising: one for data from within the social network, and another for data from external sources.

**Relevance to our question:** This case reinforces that bundled consent -- treating consent as all-or-nothing across multiple processing purposes -- undermines the "freely given" requirement. If the Crucible tool processes data for purposes distinct from the main event, separate consent is needed, and the controller must ensure that the attendee's choice is not distorted by an imbalance of power or lack of genuine alternatives.

**Source:** CJEU, Case C-252/21, *Meta Platforms Inc. and Others v Bundeskartellamt*, ECLI:EU:C:2023:537; see [GDPRhub entry](https://www.gdprhub.eu/index.php?title=CJEU_-_C-252/21_-_Meta_Platforms_and_Others_(General_terms_of_use_of_a_social_network)).

---

## 3. EDPB GUIDELINES 05/2020 ON CONSENT

The European Data Protection Board's Guidelines 05/2020 on consent under Regulation 2016/679 (Version 1.1, adopted 4 May 2020) provide the authoritative regulatory interpretation.

### 3.1 Freely Given -- General Standard (Paragraphs 13-23)

The EDPB states that consent can only be valid if the data subject is able to exercise a **real choice**, and there is **no risk of deception, intimidation, coercion or significant negative consequences** if they do not consent. Consent will not be free in cases where there is any element of compulsion, pressure, or inability to exercise free will.

Key factors in the assessment include:
- Whether the data subject suffers **detriment** by not consenting or withdrawing consent
- Whether there is an **imbalance of power** between the data subject and the controller
- Whether consent is required to access goods or services even though the processing is not necessary for contract fulfilment (**conditionality**)
- Whether the data subject is able to consent to different processing operations separately (**granularity**)

### 3.2 Conditionality (Paragraphs 38-41)

Article 7(4) targets situations where consent is "bundled" with acceptance of terms and conditions, or made a prerequisite for accessing a service.

**Paragraph 38:** The EDPB states that access to services and functionalities must not be made conditional on the consent of a user to data processing that is not necessary for those services (the "cookie wall" prohibition as a specific instance).

**Paragraph 39:** Cookie walls -- where access to a website is blocked unless the user consents -- are cited as a paradigmatic example of invalid conditionality. Consent obtained through such mechanisms is presumed not to be freely given.

**Paragraph 37:** Providing an **equivalent alternative** that does not involve unnecessary data processing is a recommended practice to demonstrate that genuine choices have been presented to data subjects.

### 3.3 Granularity (Section 3.1.2)

When a service involves multiple processing operations for more than one purpose, data subjects should be free to choose which purpose they accept, rather than having to consent to a bundle of processing purposes. Controllers must provide a **separate opt-in for each purpose**.

### 3.4 Detriment (Paragraphs 47-48)

The data subject must always be able to refuse or withdraw consent **without detriment**. If the user experiences negative consequences due to withholding or withdrawing consent, consent is not freely given. However, the EDPB recognises that the mere unavailability of a benefit to those who do not consent does not automatically constitute "detriment" -- the line is crossed when the non-consenting user is **unfairly penalised**.

**Source:** EDPB Guidelines 05/2020 on consent under Regulation 2016/679, Version 1.1, available at [edpb.europa.eu](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en).

---

## 4. THE CORE vs. ADDITIONAL SERVICE DISTINCTION

This is the crux of the analysis. The question turns on whether the "service" for the purposes of Article 7(4) is:

**(a)** The **event as a whole** (including the additional digital tool as part of the experience), or

**(b)** The **core event participation** (which does not require consent), with the digital tool as a **separate, optional add-on**.

### Under interpretation (a):
If the digital tool is treated as part of the integrated event experience, then conditioning access to it on consent could be seen as making the "provision of a service" conditional on consent to unnecessary processing -- a presumptive violation of Article 7(4).

### Under interpretation (b):
If the digital tool is genuinely a distinct, optional service layered on top of event participation, then the conditionality test in Article 7(4) may not be triggered at all. The "service" whose performance is at issue is the digital tool itself, and data processing may well be necessary for that tool's performance -- meaning Article 7(4) is satisfied.

**The EDPB's position supports a nuanced approach:** The key question is whether the data processing is **necessary for the performance of the specific service** the data subject is accessing. If the digital tool genuinely requires certain data processing to function, and the data subject can freely choose whether to use the tool without being penalised in their access to the core event, then consent may be valid.

**The ICO (UK) provides additional guidance:** Consent should not be regarded as freely given if the data subject has no genuine or free choice, or is unable to refuse or withdraw consent without detriment. The fact that a benefit is unavailable to those who do not consent does not amount to a detriment for refusal, but the controller must be careful not to cross the line into unfairly penalising those who refuse.

---

## 5. ARGUMENTS THAT CONSENT WAS FREELY GIVEN

The following arguments support a finding that consent to data processing for an additional digital service (e.g., Crucible) at a free event was freely given:

### 5.1 Main Service Available Without Consent
The core service -- participation in the event itself -- remains fully available regardless of whether the attendee consents to data processing for the additional digital tool. This is the strongest argument. Article 7(4) is concerned with situations where "the performance of a contract, including the provision of a service, is conditional on consent." If the event can be fully attended without consent, this condition is not met.

### 5.2 The Digital Tool Is a Genuinely Optional Add-On
If the digital tool is clearly presented as a separate, optional enhancement -- not as an integral part of the event experience -- then the attendee has a genuine binary choice: use the tool (with data processing) or do not use the tool (without data processing). This mirrors the EDPB's paragraph 37 recommendation of providing an "equivalent alternative."

### 5.3 No Detriment for Refusal
If attendees who decline to use the digital tool suffer no negative consequences in their event experience -- they receive the same instruction, the same materials, the same access to facilitators -- then refusal carries no detriment in the EDPB's sense. The mere fact that a particular feature is unavailable does not constitute detriment (EDPB Guidelines 05/2020, paragraphs 47-48).

### 5.4 Data Processing Is Necessary for the Tool's Function
If the digital tool requires data processing to deliver its functionality (e.g., generating personalised outputs, tracking responses, or enabling collaborative features), then the processing may be "necessary for the performance" of the tool-as-service. In that case, Article 7(4) does not create a presumption against free consent even under the conditionality test.

### 5.5 Genuine Choice Was Communicated
If the event organiser clearly communicated that (a) the digital tool is optional, (b) what data would be processed and why, and (c) that declining would have no impact on event participation, then the consent meets the requirements of being informed and specific under Article 4(11).

### 5.6 No Imbalance of Power
Unlike employer-employee or public authority-citizen relationships (where Recital 43 presumes an imbalance), a free event attended voluntarily does not inherently create a power imbalance. The attendee is not dependent on the event organiser for employment, government services, or essential needs.

---

## 6. ARGUMENTS THAT CONSENT WAS NOT FREELY GIVEN

### 6.1 Social Pressure and Group Dynamics
At a live event -- particularly a workshop, training, or immersive experience -- significant social pressure may exist to participate in all activities, including those requiring data processing. When a facilitator introduces a digital tool and the rest of the group begins using it, declining becomes socially costly. The EDPB recognises that "any element of inappropriate pressure or influence which could affect the outcome of that choice renders the consent invalid" (EDPB Guidelines 05/2020). Social pressure at a live event may constitute such inappropriate influence.

### 6.2 Bundled Experience
If the digital tool is presented as part of the integrated event experience -- rather than as a clearly separate, optional add-on -- then the distinction between "core service" and "additional service" collapses. The more the tool is woven into the fabric of the event (e.g., results from the tool are discussed in group sessions, or the tool is introduced as a key component of the methodology), the more it resembles a bundled consent scenario condemned by Recital 43 and the Meta Platforms ruling (C-252/21).

### 6.3 No Practical Alternative
Even if technically the attendee can decline, the question is whether a **practical** alternative exists. If the event agenda is structured so that a significant portion of the session revolves around the digital tool, declining consent effectively means sitting out a substantial part of the experience the attendee came for. This goes beyond the mere unavailability of a "benefit" and begins to look like detriment.

### 6.4 Informed Consent Deficiencies
Under Orange Romania (C-61/19), the controller must not mislead the data subject about the consequences of refusal. If the presentation of the digital tool does not clearly articulate (a) what data is collected, (b) for what purposes, (c) that use is genuinely optional, and (d) what the experience looks like for someone who declines, then the consent fails the "informed" requirement and may also fail the "freely given" requirement because the data subject cannot make a genuine choice without adequate information.

### 6.5 Power Dynamics in Training/Educational Contexts
While a free event is not an employment context, training and educational settings involve their own power dynamics. A facilitator or instructor occupies a position of authority. Attendees who have come to learn may feel a particular pressure to comply with the facilitator's instructions, including using a digital tool. This dynamic, while softer than employer-employee relationships, may still affect the voluntariness of consent. The EDPB recognises that consent is "more difficult" to obtain freely where there is an imbalance of power (Guidelines 05/2020, paragraph 21).

### 6.6 Timing of Consent Request
If consent is requested at the moment the tool is to be used -- rather than in advance, during registration -- the data subject is placed under time pressure and social pressure simultaneously. The EDPB's emphasis on consent being given without "coercion" or "significant negative consequences" suggests that the timing and context of the request matter.

### 6.7 Granularity Concerns
If the consent request for the digital tool encompasses multiple processing purposes (e.g., tool functionality, analytics, profile building, marketing) without offering separate opt-ins for each, then the granularity requirement of Recital 43 and EDPB Guidelines 05/2020 (Section 3.1.2) is violated, and consent is presumed not to be freely given.

---

## 7. CONSENT IN EDUCATIONAL AND TRAINING CONTEXTS

There is limited specific CJEU case law on consent in educational or training contexts, but several principles from the broader framework apply:

- **Power imbalance:** Recital 43 expressly addresses public authorities. While a private training provider is not a public authority, the facilitator-student dynamic creates an analogous (if weaker) imbalance. The EDPB recognises that power imbalances exist on a spectrum and must be assessed in context.
- **Event-specific guidance:** The Irish Data Protection Commission has published guidance on GDPR for events (including attendee lists and name tags), emphasising that data collection at events must be purpose-limited and transparent.
- **University and research contexts:** UC Berkeley's HRPP guidance on GDPR notes that in academic and research settings, particular care must be taken because participants may feel pressure to contribute data as part of the learning experience.
- **Practical consensus:** Industry guidance from event technology providers (Cvent, Fielddrive, EventsAir) consistently recommends offering separate, unchecked opt-in boxes for each type of data usage, obtaining consent during registration rather than at the event itself, and ensuring that non-consenting attendees receive an equivalent core experience.

---

## 8. SYNTHESIS AND CONCLUSION

### The decisive factors are:

| Factor | Points toward valid consent | Points against valid consent |
|--------|---------------------------|------------------------------|
| Core service access | Main event fully accessible without consent | -- |
| Separation of services | Tool clearly presented as optional add-on | Tool integrated into event flow |
| Detriment | No penalty for declining | Missing part of the experience |
| Social pressure | Low (large event, anonymous) | High (small group, facilitator-led) |
| Timing | Consent obtained during registration | Consent requested live at event |
| Information provided | Clear, complete, specific | Vague, rushed, or incomplete |
| Granularity | Separate opt-ins per purpose | Bundled "accept all" |
| Power imbalance | Attendee is a free agent | Facilitator authority dynamic |
| Processing necessity | Data needed for tool function | Data goes beyond tool function |

### Bottom line:

The analysis turns on **how the choice is actually presented in practice**, not merely on the formal availability of an alternative. If:

1. The core event is genuinely accessible without consent;
2. The digital tool is clearly communicated as optional;
3. Non-consenting attendees suffer no practical detriment;
4. Consent is obtained with adequate information and without social pressure; and
5. Separate consent is obtained for each processing purpose --

then consent is likely to be freely given under GDPR Article 7.

However, if the tool is woven into the event experience such that declining means missing a material portion of the session, or if consent is requested in a group setting where social pressure to comply is significant, then the consent is vulnerable to challenge under the EDPB's "no detriment" and "genuine free choice" standards, the Orange Romania principle against structural impediments to refusal, and the Meta Platforms requirement for unbundled, purpose-specific consent.

---

## 9. KEY SOURCES

### Primary Law
- Regulation (EU) 2016/679, Articles 4(11), 6(1)(a), 7(1)-(4)
- Regulation (EU) 2016/679, Recital 43

### CJEU Case Law
- **C-673/17, Planet49** (1 October 2019) -- active consent, specificity, no inference from other actions
- **C-61/19, Orange Romania** (11 November 2020) -- burden of proof, structural impediments to refusal, misleading framing
- **C-252/21, Meta Platforms v Bundeskartellamt** (4 July 2023) -- bundled consent, power imbalance, separate consents for separate purposes

### Regulatory Guidance
- **EDPB Guidelines 05/2020** on consent under Regulation 2016/679, Version 1.1 (4 May 2020)
- ICO Guidance on Valid Consent (ico.org.uk)
- Irish DPC Guidance on GDPR for Events

### Event-Specific Guidance
- Cvent, "GDPR for Events: A Practical Guide"
- IEEE, "How to Make Your Event Registration Process GDPR Compliant"
- Fielddrive, "GDPR Practices in Attendee Data Collection for Events"

---

*This memo is for research purposes only and does not constitute legal advice. The analysis should be reviewed by qualified legal counsel before any compliance decisions are made.*
