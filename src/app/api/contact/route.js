import nodemailer from "nodemailer";

export async function POST(req) {
    try {
    const body = await req.json();
    const { name, email, message } = body;    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    })

    await transporter.sendMail({
        from: email,  
        to: process.env.GMAIL_USER,     
        subject: `New message from ${name}`,
        replyTo: email,                 
        text: `
        You received a new message from your contact form:

        Name: ${name}
        Email: ${email}

        Message:
        ${message}
        `,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
        });

    return Response.json({ message: 'Message sent successfully' }, { status: 200 });
        
    } catch (error) {
        return Response.json({ error: 'Failed to send message' }, { status: 500 });
        
    }

}