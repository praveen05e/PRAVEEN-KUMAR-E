async function createAdmin() {
  try {
    const response = await fetch("http://localhost:3000/api/auth/sign-up/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "http://localhost:3000"
      },
      body: JSON.stringify({
        email: "admin@portfolio.com",
        password: "AdminPassword123!",
        name: "Admin"
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("✅ Admin user created successfully!");
      console.log("Email: admin@portfolio.com");
      console.log("Password: AdminPassword123!");
    } else {
      console.error("❌ Failed to create admin:", data);
    }
  } catch (error) {
    console.error("❌ Error: Make sure your Next.js dev server is running (pnpm run dev).");
    console.error(error.message);
  }
}

createAdmin();
