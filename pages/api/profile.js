
export async function fetchProfile(token) {
    const res = await fetch(process.env.NEXT_PUBLIC_SITE_URL+`/api/test/profile`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    } else {
      throw new Error("Failed to fetch user profile");
    }
  }
  