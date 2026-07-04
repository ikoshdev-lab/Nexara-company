# 🚀 Render.com-ga Node.js Serverni Joylashtirish Qo'llanmasi

Ushbu loyiha Node.js va Express serveri bilan jihozlangan hamda xabarlarni saqlash uchun MongoDB ma'lumotlar bazasiga ulangan.

## 🛠️ Render.com-da Sozlash Qadamlari:

1. **GitHub Repozitoriya Yaratish:**
   - GitHub profilingizga kiring va yangi repozitoriya yarating (masalan: `nexara-global-web`).
   - Terminalingizdan ushbu buyruqlarni berib, kodlarni yuklang:
     ```bash
     git add .
     git commit -m "Render.com uchun Node.js server integratsiyasi"
     git remote add origin https://github.com/SizningUsername/repo-nomi.git
     git branch -M main
     git push -u origin main
     ```

2. **Render.com-da Web Service Yaratish:**
   - **[Render.com](https://render.com/)** saytiga kiring (GitHub profilingiz bilan kiring).
   - Oynaning tepasida **"New +"** tugmasini bosing va **"Web Service"** ni tanlang.
   - O'zingiz yaratgan GitHub repozitoriyangizni ulang (`Connect` tugmasini bosing).

3. **Sozlamalarni Belgilash:**
   - **Name:** Loyihangiz nomi (masalan: `nexara-global`)
   - **Runtime:** `Node` (avtomatik tanlanadi)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free` (bepul reja)

4. **Environment Variables (Atrof-muhit o'zgaruvchilari) Qo'shish:**
   - Sozlash sahifasida **"Environment"** yoki **"Advanced"** tugmasini bosing.
   - **"Add Environment Variable"** tugmasini bosing va quyidagilarni kiriting:
     * **Key:** `MONGO_URI`
     * **Value:** `mongodb+srv://ikoshdev_db_user:AsoschiIkrom2026@cluster0.i6iksbe.mongodb.net/?appName=Cluster0`
   - Shuningdek, MongoDB Atlas xavfsizligi uchun IP-manzil cheklovlarini (Allow Access from Anywhere - `0.0.0.0/0`) yoqib qo'yganingizga ishonch hosil qiling.

5. **Deploy qilish:**
   - Sahifa oxirida **"Create Web Service"** tugmasini bosing.
   - Render serveringizni avtomatik tarzda build qilib, ishga tushiradi!

Sizga berilgan bepul havola orqali saytingiz internetda ishlaydi va barcha aloqa formasi xabarlari bevosita MongoDB bazangizga saqlanadi!
