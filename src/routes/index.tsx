import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Heart, CheckCircle2, AlertTriangle, Loader2, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-illustration.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stunting Prediction — AI Deep Neural Network" },
      {
        name: "description",
        content:
          "Sistem prediksi status stunting balita menggunakan data antropometri dan teknologi Deep Neural Network.",
      },
    ],
  }),
  component: Index,
});

type PredictionResult = {
  prediction: "Stunting" | "Non-Stunting";
  confidence: number;
};

function Index() {
  const [gender, setGender] = useState<string>("1");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Simulated AI inference (fake POST /predict)
    await new Promise((r) => setTimeout(r, 1800));

    const a = Number(age);
    const h = Number(height);
    const w = Number(weight);
    // Simple heuristic for demo only
    const expectedHeight = 50 + a * 1.2;
    const heightDeficit = expectedHeight - h;
    const bmi = w / Math.pow(h / 100, 2);
    const isStunting = heightDeficit > 6 || bmi < 13;
    const confidence = 90 + Math.random() * 9.5;

    setResult({
      prediction: isStunting ? "Stunting" : "Non-Stunting",
      confidence: Number(confidence.toFixed(1)),
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
              <Heart className="h-5 w-5" fill="currentColor" />
            </div>
            <span className="text-lg font-bold tracking-tight">Stunting Prediction</span>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground sm:flex">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by Deep Neural Network
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-primary">
              <Activity className="h-3.5 w-3.5" /> AI Healthcare
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Prediksi Status Stunting Balita
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Masukkan data antropometri balita untuk mengetahui hasil prediksi status
              stunting menggunakan AI.
            </p>
            <a
              href="#predict"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-90"
            >
              Mulai Prediksi
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center"
          >
            <img
              src={heroImg}
              alt="Ilustrasi pemeriksaan kesehatan balita"
              width={1024}
              height={1024}
              className="w-full max-w-md drop-shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Form Prediksi */}
      <section id="predict" className="mx-auto max-w-3xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:p-10"
        >
          <h2 className="text-2xl font-bold tracking-tight">Form Data Antropometri</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Isi data balita untuk memulai prediksi.
          </p>

          <form onSubmit={handlePredict} className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="gender">Jenis Kelamin</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger id="gender" className="h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Laki-laki</SelectItem>
                  <SelectItem value="0">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Umur (bulan)</Label>
              <Input
                id="age"
                type="number"
                min={0}
                max={60}
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="cth. 24"
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Tinggi badan (cm)</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                required
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="cth. 82"
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Berat badan (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="cth. 10"
                className="h-11 rounded-xl"
              />
            </div>

            <div className="md:col-span-2">
              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl text-base font-semibold shadow-[var(--shadow-soft)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menganalisis...
                  </>
                ) : (
                  "Prediksi Sekarang"
                )}
              </Button>
            </div>
          </form>

          {/* Result */}
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 flex flex-col items-center justify-center rounded-2xl bg-muted py-10"
              >
                <div className="relative h-14 w-14">
                  <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-muted-foreground">
                  AI sedang menganalisis data...
                </p>
              </motion.div>
            )}

            {result && !loading && (
              <ResultCard key="result" result={result} />
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Model Performance */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Model Performance</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Hasil evaluasi model Deep Neural Network.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Accuracy", value: "99.43%" },
            { label: "Precision", value: "98.24%" },
            { label: "Recall", value: "99.20%" },
            { label: "ROC-AUC", value: "99.98%" },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm"
            >
              <div className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
                {m.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs italic text-muted-foreground">
          Evaluation results based on synthetic dataset.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-card/50">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Stunting Prediction · Built with Deep Neural Network
        </div>
      </footer>
    </div>
  );
}

function ResultCard({ result }: { result: PredictionResult }) {
  const isStunting = result.prediction === "Stunting";
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={`mt-8 overflow-hidden rounded-2xl border p-6 ${
        isStunting
          ? "border-red-200 bg-red-50"
          : "border-emerald-200 bg-emerald-50"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
            isStunting ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"
          }`}
        >
          {isStunting ? (
            <AlertTriangle className="h-6 w-6" />
          ) : (
            <CheckCircle2 className="h-6 w-6" />
          )}
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Hasil Prediksi
          </div>
          <div
            className={`mt-1 text-2xl font-extrabold ${
              isStunting ? "text-red-700" : "text-emerald-700"
            }`}
          >
            {result.prediction}
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>Confidence Score</span>
              <span>{result.confidence}%</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/70">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  isStunting ? "bg-red-500" : "bg-emerald-500"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
