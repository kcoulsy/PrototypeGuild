'use client';

import { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { createUserAction } from '@/actions/users/createUser';
import { useRouter } from 'next/navigation';
// import ReCAPTCHA from 'react-google-recaptcha';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    recaptcha: '',
    characterName: '',
    playerClass: '',
    playerRole: '',
    professionOne: '',
    professionTwo: '',
    discordTag: '',
    applicationJSON: {
      aboutSelf: '',
      value: '',
      experience: '',
      ui: '',
      anythingElse: '',
    },
    email: '',
    password: '',
    confirm: '',
    error: '',
  });
  const router = useRouter();

  const { execute, isExecuting, result } = useAction(createUserAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('profile', JSON.stringify(data.user));
        router.push('/');
      }
    },
    onError: ({ error }) => {
      setFormData((prev) => ({
        ...prev,
        error: 'Unable to create account',
      }));
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newState = { ...prev, error: '' };
      (newState as any)[name] = value;
      return newState;
    });
  };

  const handleExtraInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      error: '',
      applicationJSON: {
        ...prev.applicationJSON,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const data = {
        ...formData,
        applicationJSON: JSON.stringify(formData.applicationJSON),
      };
      execute(data);
    }
  };

  const validate = () => {
    const {
      characterName,
      playerClass,
      playerRole,
      discordTag,
      email,
      password,
      confirm,
      recaptcha,
      professionOne,
      professionTwo,
    } = formData;

    if (!characterName.length) {
      setFormData((prev) => ({
        ...prev,
        error: 'You must enter your character name!',
      }));
      return false;
    }
    if (!playerClass.length) {
      setFormData((prev) => ({
        ...prev,
        error: 'You must select a class!',
      }));
      return false;
    }
    if (!playerRole.length) {
      setFormData((prev) => ({
        ...prev,
        error: 'You must select a role!',
      }));
      return false;
    }
    if (!discordTag) {
      setFormData((prev) => ({
        ...prev,
        error: 'You must add your discord!',
      }));
      return false;
    }
    if (!email) {
      setFormData((prev) => ({
        ...prev,
        error: 'You must enter your email!',
      }));
      return false;
    }
    if (!email.includes('@')) {
      setFormData((prev) => ({
        ...prev,
        error: 'Please enter a valid email address!',
      }));
      return false;
    }
    if (!password) {
      setFormData((prev) => ({
        ...prev,
        error: 'You must enter your password',
      }));
      return false;
    }
    if (password.length < 6) {
      setFormData((prev) => ({
        ...prev,
        error: 'Your password must be greater than 6 characters!',
      }));
      return false;
    }
    if (!confirm) {
      setFormData((prev) => ({
        ...prev,
        error: 'You must enter your password confirmation!',
      }));
      return false;
    }
    if (confirm !== password) {
      setFormData((prev) => ({
        ...prev,
        error: 'Your passwords must match!',
      }));
      return false;
    }
    if (!recaptcha.length) {
      setFormData((prev) => ({
        ...prev,
        error: "You must prove you're not a robot!",
      }));
      return false;
    }
    if (!professionOne.length || !professionTwo.length) {
      setFormData((prev) => ({
        ...prev,
        error: 'You must pick both professions!',
      }));
      return false;
    }
    return true;
  };

  return (
    <>
      <form className="proto-form form-apply" onSubmit={handleSubmit}>
        <input
          name="discordTag"
          type="text"
          value={formData.discordTag}
          onChange={handleChange}
          placeholder="Discord Tag"
        />
        <input
          name="characterName"
          type="text"
          value={formData.characterName}
          onChange={handleChange}
          placeholder="Character Name"
        />
        <select
          name="playerClass"
          value={formData.playerClass}
          onChange={handleChange}
        >
          <option value="">Please select a class</option>
          <option value="warrior">Warrior</option>
          <option value="paladin">Paladin</option>
          <option value="hunter">Hunter</option>
          <option value="druid">Druid</option>
          <option value="rogue">Rogue</option>
          <option value="mage">Mage</option>
          <option value="priest">Priest</option>
          <option value="warlock">Warlock</option>
        </select>
        <select
          name="playerRole"
          value={formData.playerRole}
          onChange={handleChange}
        >
          <option value="">Please select a role</option>
          <option value="tank">Tank</option>
          <option value="healer">Healer</option>
          <option value="melee">Melee</option>
          <option value="ranged">Ranged</option>
        </select>
        <select
          name="professionOne"
          value={formData.professionOne}
          onChange={handleChange}
        >
          <option value="">Please select your first profession</option>
          <option value="mining">Mining</option>
          <option value="herbalism">Herbalism</option>
          <option value="skinning">Skinning</option>
          <option value="engineering">Engineering</option>
          <option value="enchanting">Enchanting</option>
          <option value="alchemy">Alchemy</option>
          <option value="tailoring">Tailoring</option>
          <option value="leatherworking">Leatherworking</option>
          <option value="blacksmithing">Blacksmithing</option>
        </select>
        <select
          name="professionTwo"
          value={formData.professionTwo}
          onChange={handleChange}
        >
          <option value="">Please select your second profession</option>
          <option value="mining">Mining</option>
          <option value="herbalism">Herbalism</option>
          <option value="skinning">Skinning</option>
          <option value="engineering">Engineering</option>
          <option value="enchanting">Enchanting</option>
          <option value="alchemy">Alchemy</option>
          <option value="tailoring">Tailoring</option>
          <option value="leatherworking">Leatherworking</option>
          <option value="blacksmithing">Blacksmithing</option>
        </select>
        <textarea
          name="aboutSelf"
          cols={30}
          rows={5}
          value={formData.applicationJSON.aboutSelf}
          onChange={handleExtraInfoChange}
          placeholder="Tell us about yourself?"
        />
        <textarea
          name="value"
          cols={30}
          rows={5}
          value={formData.applicationJSON.value}
          onChange={handleExtraInfoChange}
          placeholder="What do you value in a guild?"
        />
        <textarea
          name="experience"
          cols={30}
          rows={5}
          value={formData.applicationJSON.experience}
          onChange={handleExtraInfoChange}
          placeholder="What experience do you have raiding in wow? (Can be classic, bfa or anything in between, just be honest)"
        />
        <input
          type="text"
          name="ui"
          value={formData.applicationJSON.ui}
          placeholder="A recent UI screenshot."
          onChange={handleExtraInfoChange}
        />
        <textarea
          name="anythingElse"
          cols={30}
          rows={5}
          value={formData.applicationJSON.anythingElse}
          onChange={handleExtraInfoChange}
          placeholder="Anything else you would like to add?"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          autoComplete="email"
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="new-password"
        />
        <input
          name="confirm"
          type="password"
          value={formData.confirm}
          onChange={handleChange}
          placeholder="Confirm"
          autoComplete="new-password"
        />
        {/* <ReCAPTCHA
                    sitekey={
                        process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ''
                    }
                    onChange={(val) =>
                        setFormData((prev) => ({
                            ...prev,
                            recaptcha: val || '',
                        }))
                    }
                /> */}
        <button
          className="proto-btn"
          onClick={handleSubmit}
          type="submit"
          disabled={isExecuting}
        >
          {isExecuting ? 'Applying...' : 'Apply Now'}
        </button>
      </form>
      {formData.error}
    </>
  );
}
