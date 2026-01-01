import { motion } from "framer-motion";
import { Lightbulb, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  theme: any;
};

const tips = [
  {
    text: (
      <>
        Clear, front-facing photos work best for{" "}
        <strong className="font-semibold">character transformation</strong>.
      </>
    ),
  },
  {
    text: (
      <>
        Try the <strong className="font-semibold">"Spirited Away"</strong> preset for classic
        Miyazaki style.
      </>
    ),
  },
  {
    text: "Well-lit photos with visible facial features give the best results.",
  },
];

export default function ProTipsCard({ theme }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <Card className="ghibli-card overflow-hidden dappled-light wobbly-box border-none sketch-border">
        <CardHeader className="border-b-2 border-slate-700/40 pb-4 pt-5 px-6 relative">
          <div className="absolute inset-0 watercolor-edge opacity-20 pointer-events-none" />
          <CardTitle className="flex items-center text-lg font-bold text-slate-100">
            <motion.div
              className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 text-white shadow-lg wobbly-circle"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.primary})`,
                boxShadow: `0 4px 12px ${theme.colors.accent}40, inset 0 2px 4px rgba(255,255,255,0.2)`,
              }}
              whileHover={{ rotate: -8, scale: 1.05 }}
              animate={{
                boxShadow: [
                  `0 4px 12px ${theme.colors.accent}40, inset 0 2px 4px rgba(255,255,255,0.2)`,
                  `0 4px 16px ${theme.colors.accent}60, inset 0 2px 4px rgba(255,255,255,0.25)`,
                  `0 4px 12px ${theme.colors.accent}40, inset 0 2px 4px rgba(255,255,255,0.2)`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Lightbulb className="w-5 h-5 drop-shadow-md" />
            </motion.div>
            <span className="font-display text-xl" style={{ color: theme.colors.accent }}>
              Pro Tips for Magic
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-3">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-3 group"
            >
              <motion.div whileHover={{ rotate: 180, scale: 1.2 }} transition={{ duration: 0.3 }}>
                <Sparkles
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: theme.colors.accent }}
                />
              </motion.div>
              <p className="text-sm text-slate-300 leading-relaxed">{tip.text}</p>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
