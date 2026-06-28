export async function POST(request: Request) {
  const body = await request.json();

  if (body.action === "send-otp") {
    return Response.json({
      success: true,
      message: "OTP sent successfully",
      otpId: "otp_" + Date.now(),
    });
  }

  if (body.action === "verify-otp") {
    return Response.json({
      success: true,
      token: "token_" + Date.now(),
      user: {
        id: "1",
        name: "Admin User",
        role: "school_admin",
        schoolId: "1",
      },
    });
  }

  if (body.action === "login") {
    return Response.json({
      success: true,
      token: "token_" + Date.now(),
      user: {
        id: "1",
        name: "Admin User",
        email: body.email,
        role: "school_admin",
        schoolId: "1",
      },
    });
  }

  return Response.json({ success: false, message: "Invalid action" }, { status: 400 });
}
