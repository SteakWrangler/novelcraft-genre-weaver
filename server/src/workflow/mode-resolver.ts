import type { AgentConfig } from '../agents/types.js';
import type { BookSettings } from '../types/shared.js';
import type { AgentMode, AudienceStyle } from '../types/project.js';

/**
 * Determines the agent mode (generate/expand/hybrid) based on user input.
 *
 * - > threshold chars → EXPAND (formalize + fill gaps)
 * - Some content but < threshold → HYBRID (anchor + generate)
 * - Empty → GENERATE (from scratch)
 */
export function resolveAgentMode(
  agentConfig: AgentConfig,
  settings: BookSettings
): AgentMode {
  if (!agentConfig.mode) {
    return 'generate';
  }

  const fieldValue = getFieldValue(agentConfig.mode.inputField, settings);
  const length = fieldValue.length;
  const threshold = agentConfig.mode.expandThreshold;

  if (length > threshold) return 'expand';
  if (length > 0) return 'hybrid';
  return 'generate';
}

function getFieldValue(fieldName: string, settings: BookSettings): string {
  const fieldMap: Record<string, string | undefined> = {
    description: settings.description,
    plotOutline: settings.plotOutline,
    characterDetails: settings.characterDetails,
    settingDetails: settings.setting,
    themes: settings.themes,
  };

  return fieldMap[fieldName] || '';
}

/**
 * Derives audience style from book format settings.
 */
export function deriveAudienceStyle(settings: BookSettings): AudienceStyle {
  const format = settings.format?.format;
  if (!format) return 'adult';

  switch (format) {
    case 'picture-book':
    case 'early-reader':
      return 'children';
    case 'middle-grade':
      return 'middle-grade';
    default:
      // Use audience from format settings if available
      if (settings.format?.audience === 'young-adult') return 'young-adult';
      if (settings.format?.audience === 'children') return 'children';
      return 'adult';
  }
}
