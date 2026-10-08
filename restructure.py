import re

with open('/Users/gowthamshanmugam/Desktop/Mara/index.html', 'r') as f:
    content = f.read()

# 1. Extract the Product Categories Section
start_marker = "<!-- Product Categories Section -->"
end_marker = "<!-- Social Proof & Verified Testimonials -->"
start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

products_section = content[start_idx:end_idx]

# 2. Remove it from the original place
content = content[:start_idx] + content[end_idx:]

# 3. Insert it right before "<!-- WHAT WE PROVIDE: CORE PRODUCTS & CONTRACTING SERVICES SECTION -->"
insert_marker = "<!-- WHAT WE PROVIDE: CORE PRODUCTS & CONTRACTING SERVICES SECTION -->"
insert_idx = content.find(insert_marker)
content = content[:insert_idx] + products_section + "\n        " + content[insert_idx:]

# 4. We want to replace the CTA Section with a much better Contact section.
cta_start = "<!-- CTA Section -->"
cta_end = "</main>"
cta_start_idx = content.find(cta_start)
cta_end_idx = content.find(cta_end)

new_contact_section = """<!-- Professional Contact Section -->
        <section class="section" style="background: var(--color-surface); padding: 80px 0; border-top: 1px solid var(--color-border);">
            <div class="container">
                <div class="section-header reveal-fade-up text-center">
                    <span class="section-subtitle"><i class="fa-solid fa-headset"></i> GET IN TOUCH</span>
                    <h2 class="section-title">Ready to Start Your Project?</h2>
                    <p class="section-description" style="max-width: 600px; margin: 0 auto;">Connect with our technical experts for genuine product recommendations, site inspections, and customized quotations.</p>
                </div>

                <div class="grid-2-col gap-8 reveal-fade-up">
                    <!-- Contact Info -->
                    <div style="background: linear-gradient(135deg, var(--color-surface), rgba(14, 165, 233, 0.05)); border: 1px solid var(--color-border); padding: 40px; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
                        <h3 style="margin-bottom: 24px; font-size: 1.5rem; color: var(--color-text);">Contact Information</h3>
                        <div style="display: flex; flex-direction: column; gap: 24px;">
                            <div style="display: flex; gap: 16px; align-items: flex-start;">
                                <div style="width: 48px; height: 48px; background: var(--color-secondary-light); color: var(--color-secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0;">
                                    <i class="fa-solid fa-phone"></i>
                                </div>
                                <div>
                                    <span style="display: block; font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 4px;">Call Us directly</span>
                                    <a href="tel:+919884701587" style="font-weight: 700; font-size: 1.2rem; color: var(--color-text); text-decoration: none;">+91 98847 01587</a>
                                </div>
                            </div>
                            <div style="display: flex; gap: 16px; align-items: flex-start;">
                                <div style="width: 48px; height: 48px; background: var(--color-secondary-light); color: var(--color-secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0;">
                                    <i class="fa-solid fa-envelope"></i>
                                </div>
                                <div>
                                    <span style="display: block; font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 4px;">Email Support</span>
                                    <a href="mailto:senthil@marainfra.com" style="font-weight: 700; font-size: 1.1rem; color: var(--color-text); text-decoration: none;">senthil@marainfra.com</a>
                                </div>
                            </div>
                            <div style="display: flex; gap: 16px; align-items: flex-start;">
                                <div style="width: 48px; height: 48px; background: var(--color-accent-light); color: var(--color-accent-dark); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0;">
                                    <i class="fa-solid fa-location-dot"></i>
                                </div>
                                <div>
                                    <span style="display: block; font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 4px;">Visit Showroom</span>
                                    <strong style="color: var(--color-text); font-size: 1rem;">Main Road, Hosur & Krishnagiri Town,<br>Tamil Nadu</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Contact Form -->
                    <div style="background: var(--color-surface); padding: 40px; border-radius: var(--radius-lg); border: 1px solid var(--color-border); box-shadow: var(--shadow-md);">
                        <h3 style="margin-bottom: 24px; font-size: 1.5rem; color: var(--color-text);">Send an Enquiry</h3>
                        <form style="display: flex; flex-direction: column; gap: 16px;">
                            <div class="grid-2-col gap-4">
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    <label style="font-size: 0.9rem; font-weight: 600; color: var(--color-text);">Full Name</label>
                                    <input type="text" placeholder="Your Name" style="padding: 12px 16px; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-background); color: var(--color-text); width: 100%; outline: none;" required>
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 8px;">
                                    <label style="font-size: 0.9rem; font-weight: 600; color: var(--color-text);">Phone Number</label>
                                    <input type="tel" placeholder="Your Phone" style="padding: 12px 16px; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-background); color: var(--color-text); width: 100%; outline: none;" required>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <label style="font-size: 0.9rem; font-weight: 600; color: var(--color-text);">Email Address (Optional)</label>
                                <input type="email" placeholder="Your Email" style="padding: 12px 16px; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-background); color: var(--color-text); width: 100%; outline: none;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <label style="font-size: 0.9rem; font-weight: 600; color: var(--color-text);">Message</label>
                                <textarea placeholder="How can we help with your project?" rows="4" style="padding: 12px 16px; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-background); color: var(--color-text); width: 100%; outline: none; resize: vertical;" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg" style="margin-top: 8px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                                <i class="fa-solid fa-paper-plane"></i> Submit Enquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
"""

content = content[:cta_start_idx] + new_contact_section + "    " + content[cta_end_idx:]

with open('/Users/gowthamshanmugam/Desktop/Mara/index.html', 'w') as f:
    f.write(content)

print("Done")
