import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def create_resume(output_filename):
    # Setup document with 0.5 inch margins for maximum space usage
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    story = []

    # Palette
    c_primary = colors.HexColor("#0f172a")    # Deep Slate / Navy
    c_secondary = colors.HexColor("#0d9488")  # Teal / Emerald
    c_dark = colors.HexColor("#334155")       # Charcoal
    c_light = colors.HexColor("#f8fafc")      # Light slate (table backgrounds)
    c_border = colors.HexColor("#cbd5e1")     # Light gray border

    # Custom styles
    style_name = ParagraphStyle(
        'Name',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=c_primary,
        alignment=TA_CENTER
    )

    style_title = ParagraphStyle(
        'Title',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=c_secondary,
        alignment=TA_CENTER,
        spaceAfter=8
    )

    style_contact = ParagraphStyle(
        'Contact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=c_dark,
        alignment=TA_CENTER
    )

    style_section_title = ParagraphStyle(
        'SectionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=c_secondary,
        spaceAfter=4
    )

    style_summary = ParagraphStyle(
        'Summary',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=c_dark
    )

    style_body = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=c_dark
    )

    style_bullet = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=c_dark,
        leftIndent=15,
        firstLineIndent=-10
    )

    style_bold_inline = ParagraphStyle(
        'BoldInline',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13.5,
        textColor=c_primary
    )

    style_job_title = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=c_primary
    )

    style_company = ParagraphStyle(
        'Company',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=c_secondary
    )

    style_date = ParagraphStyle(
        'Date',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=12,
        textColor=c_dark,
        alignment=TA_RIGHT
    )

    style_skill_cat = ParagraphStyle(
        'SkillCategory',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=c_primary
    )

    # 1. Header (Name, Title, Contact)
    story.append(Paragraph("TUTIANI", style_name))
    story.append(Paragraph("QUALITY ASSURANCE ENGINEER", style_title))
    
    contact_info = (
        "Bekasi, Greater Jakarta, ID  |  tiany7597@gmail.com  |  +62 857-1050-3103  |<br/>"
        "linkedin.com/in/tutiani  |  github.com/tutiani"
    )
    story.append(Paragraph(contact_info, style_contact))
    story.append(Spacer(1, 12))

    # Helper function to create sectional lines
    def make_section_header(title_text):
        hdr_table = Table([[Paragraph(title_text, style_section_title)]], colWidths=[540])
        hdr_table.setStyle(TableStyle([
            ('LINEBELOW', (0,0), (-1,-1), 1.5, c_secondary),
            ('BOTTOMPADDING', (0,0), (-1,-1), 2),
            ('TOPPADDING', (0,0), (-1,-1), 2),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ]))
        return hdr_table

    # 2. Professional Summary
    story.append(make_section_header("PROFESSIONAL SUMMARY"))
    story.append(Spacer(1, 6))
    summary_text = (
        "Detail-oriented Quality Assurance Engineer with 1+ years of experience in manual and automation testing. "
        "Proficient in testing web, mobile, and API validation. Highly competent in Cypress, Postman, and "
        "expanding expertise in Playwright and Selenium. Proven experience in Agile sprint environments, "
        "ensuring strict adherence to system performance targets (SLA) and documentation standards (SIT/UAT scripts)."
    )
    story.append(Paragraph(summary_text, style_summary))
    story.append(Spacer(1, 10))

    # 3. Skills Matrix
    story.append(make_section_header("CORE COMPETENCIES & TOOLKIT"))
    story.append(Spacer(1, 6))
    
    skills_data = [
        [
            Paragraph("Automation Testing:", style_skill_cat),
            Paragraph("Cypress, Playwright (Exploring), Selenium WebDriver (Exploring), Robot Framework", style_body)
        ],
        [
            Paragraph("API & Database Testing:", style_skill_cat),
            Paragraph("Postman (API Validation Workflows), Newman, PostgreSQL", style_body)
        ],
        [
            Paragraph("Performance Testing:", style_skill_cat),
            Paragraph("k6 Load Testing (Load Curves, SLA threshold validation)", style_body)
        ],
        [
            Paragraph("Manual & Mobile Testing:", style_skill_cat),
            Paragraph("Test Case & Scenario Design, Android & iOS UI/UX Validation, Regression Testing", style_body)
        ],
        [
            Paragraph("Tools & Methodologies:", style_skill_cat),
            Paragraph("Jira, Git/GitHub, Agile/Scrum, SIT & UAT reporting, DRE calculations", style_body)
        ],
    ]
    
    skills_table = Table(skills_data, colWidths=[140, 400])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('BACKGROUND', (0,0), (-1,-1), colors.transparent),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 10))

    # 4. Work Experience
    story.append(make_section_header("PROFESSIONAL EXPERIENCE"))
    story.append(Spacer(1, 6))

    # Job 1: OttoDigital
    job1_header_data = [
        [Paragraph("Quality Assurance Engineer", style_job_title), Paragraph("Jan 2023 - Present", style_date)],
        [Paragraph("OttoDigital &bull; Jakarta Selatan, Indonesia", style_company), Paragraph("", style_date)]
    ]
    job1_table = Table(job1_header_data, colWidths=[380, 160])
    job1_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(job1_table)
    story.append(Spacer(1, 3))
    
    j1_bullets = [
        "Designed and executed manual/automated test cases for web and mobile UI/UX functionality and responsiveness.",
        "Developed and maintained regression test scripts using <b>Cypress</b>, reducing regression execution cycles.",
        "Conducted thorough REST API integration tests using <b>Postman</b>, checking request/response schemas and transaction payloads.",
        "Collaborated closely in Agile sprint teams with Product Managers and Developers to review and refine system criteria.",
        "Drafted comprehensive QA documentation, including SIT/UAT scripts, test execution matrices, and defect summary reports."
    ]
    for bullet in j1_bullets:
        story.append(Paragraph(f"&bull; {bullet}", style_bullet))
    story.append(Spacer(1, 8))

    # Job 2: Evermos
    job2_header_data = [
        [Paragraph("Virtual Internship - Quality Assurance", style_job_title), Paragraph("Apr 2023 - May 2023", style_date)],
        [Paragraph("Evermos &bull; Bandung, Indonesia", style_company), Paragraph("", style_date)]
    ]
    job2_table = Table(job2_header_data, colWidths=[380, 160])
    job2_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(job2_table)
    story.append(Spacer(1, 3))
    
    j2_bullets = [
        "Created API integration testing scenarios and verified multi-endpoint response logic.",
        "Conducted performance tests simulating <b>1000 virtual users (VU)</b> and <b>3500 iterations</b> to test API limits under load.",
        "Validated response latencies against strict 2.0-second corporate SLA thresholds.",
        "Generated visual performance logs and execution summaries using <b>k6</b> dashboard tools."
    ]
    for bullet in j2_bullets:
        story.append(Paragraph(f"&bull; {bullet}", style_bullet))
    story.append(Spacer(1, 8))

    # Job 3: Gunadarma Laboratory
    job3_header_data = [
        [Paragraph("Assistant Information Systems Laboratory", style_job_title), Paragraph("Mar 2020 - Sep 2022", style_date)],
        [Paragraph("Gunadarma University &bull; Kota Bekasi, Indonesia", style_company), Paragraph("", style_date)]
    ]
    job3_table = Table(job3_header_data, colWidths=[380, 160])
    job3_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(job3_table)
    story.append(Spacer(1, 3))
    
    j3_bullets = [
        "Set up lab database servers and connections before practical classes.",
        "Evaluated and graded student system implementations, providing reports on logic errors.",
        "Assisted students with debugging SQL database queries and resolving algorithm difficulties."
    ]
    for bullet in j3_bullets:
        story.append(Paragraph(f"&bull; {bullet}", style_bullet))
    story.append(Spacer(1, 10))

    # 5. Education & Certifications
    story.append(make_section_header("EDUCATION & CREDENTIALS"))
    story.append(Spacer(1, 6))

    edu_data = [
        [
            Paragraph("Bachelor of Information Systems", style_bold_inline),
            Paragraph("Gunadarma University &bull; Depok, Indonesia", style_company),
            Paragraph("GPA: 3.68/4.00 (Sep 2018 - Sep 2022)", style_date)
        ],
        [
            Paragraph("QA Engineer Certificate", style_bold_inline),
            Paragraph("Binar Academy &bull; Jakarta, Indonesia", style_company),
            Paragraph("Score: 95.90/100.00 (Mar 2023 - Apr 2023)", style_date)
        ]
    ]
    edu_table = Table(edu_data, colWidths=[160, 220, 160])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu_table)

    # Build the document
    doc.build(story)
    print(f"PDF successfully created: {output_filename}")

if __name__ == "__main__":
    create_resume("/Users/tutiani/Documents/Porto/Resume_Tutiani_QA.pdf")
