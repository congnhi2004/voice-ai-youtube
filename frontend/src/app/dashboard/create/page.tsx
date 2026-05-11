"use client";

import { Globe, Music, Settings, Upload, Volume2 } from "lucide-react";
import { useMemo, useState } from "react";

import { Card } from "../_components/dashboard-shell";

const languages = [
  ["en", "🇺🇸 English"],
  ["es", "🇪🇸 Spanish"],
  ["fr", "🇫🇷 French"],
  ["de", "🇩🇪 German"],
  ["it", "🇮🇹 Italian"],
  ["pt", "🇵🇹 Portuguese"],
  ["ru", "🇷🇺 Russian"],
  ["ja", "🇯🇵 Japanese"],
  ["ko", "🇰🇷 Korean"],
  ["zh", "🇨🇳 Chinese"],
  ["ar", "🇸🇦 Arabic"],
  ["hi", "🇮🇳 Hindi"],
  ["nl", "🇳🇱 Dutch"],
  ["pl", "🇵🇱 Polish"],
  ["tr", "🇹🇷 Turkish"],
  ["sv", "🇸🇪 Swedish"],
  ["da", "🇩🇰 Danish"],
  ["fi", "🇫🇮 Finnish"],
  ["no", "🇳🇴 Norwegian"],
  ["el", "🇬🇷 Greek"],
  ["he", "🇮🇱 Hebrew"],
  ["ms", "🇲🇾 Malay"],
  ["sw", "🇰🇪 Swahili"],
];

export default function CreatePage() {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("0.5");
  const [pacing, setPacing] = useState("0.5");
  const canGenerate = useMemo(() => text.trim().length > 0, [text]);

  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-200 bg-white py-4">
        <div className="mx-auto max-w-[88rem] space-y-2 text-center">
          <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
            Text-to-Speech Generator
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
            Generate natural-sounding speech in 23 languages with voice cloning
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[88rem] px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          <div className="order-2 space-y-4 lg:order-1 lg:col-span-1">
            <Card className="shadow-lg">
              <div className="p-4 sm:p-5">
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-base font-bold">Settings</h3>
                    <p className="text-muted-foreground text-sm">
                      Customize your speech
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Globe className="h-4 w-4" />
                      Language
                    </label>
                    <select className="border-input bg-background h-10 w-full rounded-md border px-3 py-2 text-sm">
                      {languages.map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Volume2 className="h-4 w-4" />
                      Voice
                    </label>
                    <select className="border-input bg-background h-10 w-full rounded-md border px-3 py-2 text-sm">
                      <option value="samples/voices/myvoice.wav">
                        My Voice
                      </option>
                      <option value="samples/voices/in.wav">
                        Indian Voice
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Upload className="h-4 w-4" />
                      Upload Your Voice
                    </label>
                    <div className="space-y-3">
                      <input
                        accept="audio/*"
                        className="w-full cursor-pointer text-sm file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-sm file:text-blue-700 file:hover:bg-blue-100"
                        type="file"
                      />
                      <p className="text-muted-foreground text-sm leading-5">
                        Upload a clear voice sample (WAV/MP3). Uploaded voices
                        appear in the dropdown above.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 flex items-center justify-between text-sm font-semibold">
                      <span className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Emotion/Intensity
                      </span>
                      <span className="text-muted-foreground">{emotion}</span>
                    </label>
                    <input
                      className="w-full cursor-pointer"
                      max="1"
                      min="0"
                      onChange={(event) => setEmotion(event.target.value)}
                      step="0.1"
                      type="range"
                      value={emotion}
                    />
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>Calm</span>
                      <span>Expressive</span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 flex items-center justify-between text-sm font-semibold">
                      <span className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Pacing Control
                      </span>
                      <span className="text-muted-foreground">{pacing}</span>
                    </label>
                    <input
                      className="w-full cursor-pointer"
                      max="1"
                      min="0"
                      onChange={(event) => setPacing(event.target.value)}
                      step="0.1"
                      type="range"
                      value={pacing}
                    />
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>Fast</span>
                      <span>Accurate</span>
                    </div>
                  </div>

                  <button
                    className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white shadow-xs transition-all hover:from-blue-700 hover:to-purple-700 disabled:pointer-events-none disabled:opacity-50"
                    disabled={!canGenerate}
                    type="button"
                  >
                    <Settings className="h-4 w-4" />
                    Generate Speech
                  </button>
                </div>
              </div>
            </Card>
          </div>

          <div className="order-1 space-y-4 lg:order-2 lg:col-span-2">
            <Card className="shadow-lg">
              <div className="p-4 sm:p-5">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-base font-bold">Your Text</h3>
                    <p className="text-muted-foreground text-sm">
                      Enter the text you want to convert to speech
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <textarea
                    className="border-input bg-background min-h-[19rem] w-full rounded-md border px-4 py-3 text-base leading-7 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                    maxLength={500}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Type or paste your text here... Maximum 500 characters."
                    rows={10}
                    value={text}
                  />
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{text.length}/500 characters</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-[88rem]">
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-3">
              <div className="h-8 w-0.5 rounded-full bg-gradient-to-b from-blue-500 to-purple-600" />
              <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold text-transparent">
                Recent Generations
              </h2>
              <div className="h-8 w-0.5 rounded-full bg-gradient-to-b from-purple-600 to-blue-500" />
            </div>
            <p className="text-muted-foreground mx-auto max-w-md text-base">
              Your speech generation history
            </p>
          </div>
          <div className="py-20 text-center">
            <div className="relative mx-auto mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-36 w-36 animate-pulse rounded-full bg-gradient-to-br from-blue-100 to-purple-100" />
              </div>
              <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-white shadow-lg">
                <Music className="h-11 w-11 text-gray-400" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900">
                No generations yet
              </h3>
              <p className="text-muted-foreground mx-auto max-w-md text-lg leading-relaxed">
                Start by entering some text and generating your first speech
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
