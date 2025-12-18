import { useState, useRef } from "react";
import { searchKeywords } from "../../utils/keywords";
import { X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;

  /** Style overrides */
  className?: string;
  inputClassName?: string;
  suggestionsClassName?: string;

  category?: "item" | "location";
};

const KeywordInput = ({
  value,
  onChange,
  placeholder,
  required,
  className,
  inputClassName,
  suggestionsClassName,
  category,
}: Props) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const updateSuggestions = (inputValue: string) => {
    // Si pas de catégorie, pas de suggestions
    if (!category) {
      setSuggestions([]);
      return;
    }

    if (!inputValue.trim()) {
      setSuggestions([]);
      return;
    }

    setSuggestions(searchKeywords(inputValue, category));
  };

  const resetInput = () => {
    onChange("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className ?? ""}`} ref={wrapperRef}>
      {/* Input */}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val);
            updateSuggestions(val);
            setShowSuggestions(true);
          }}
          onFocus={() => value && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          className={`
            w-full px-4 pr-10 py-1
            text-white bg-gray-800
            border border-gray-700 rounded-full text-md
            focus:outline-none focus:ring-1 focus:ring-yellow-400
            ${inputClassName ?? ""}
          `}
        />

        {/* Reset */}
        {value && (
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              resetInput();
            }}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-gray-400 hover:text-white transition
            "
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          className={`
            absolute z-50 w-full mt-1
            bg-gray-900 border border-gray-700
            rounded-xl shadow-lg
            max-h-48 overflow-y-auto
            overscroll-contain
            ${suggestionsClassName ?? ""}
          `}
        >
          {suggestions.map((word) => (
            <button
              key={word}
              type="button"
              onMouseDown={() => {
                onChange(word);
                setShowSuggestions(false);
              }}
              className="
                w-full px-4 py-2 text-left text-sm
                hover:bg-gray-800 transition
              "
            >
              {word}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default KeywordInput;
